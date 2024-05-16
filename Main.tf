locals {
  vpcs = {
    eu-vpc = {
      subnets = {
        eu-subnet = {
          region = "europe-west1"
          zone   = "europe-west1-b"
          cidr   = "10.178.0.0/24"
          vms = {
            eu-instance = {}
          }
        }
      }

      # local.vpcs["eu-vpc"].subnets["eu-subnet"].cidr = "10.178.0.0/24"
      # local.vpcs["eu-vpc"].subnets["eu-subnet"].region = "europe-west1"

      # vpn gateway for the eu-vpc that connects to the asia-vpc
      vpn-gw = {
        region = "europe-west1"
        tunnel = "asia-vpc"
        # The CIDR block for the asia-vpc, because the tunnel is going to the asia-vpc
        cidr = "192.168.178.0/24"
      }
    },

    us-vpc = {
      subnets = {
        us-east-subnet = {
          region = "us-east1"
          zone   = "us-east1-b"
          cidr   = "172.16.178.0/24"
          vms = {
            us-east-instance = {}
          }
        }
        # us-west-subnet = {
        #   region = "us-west1"
        #   zone   = "us-east1-b"
        #   cidr   = "172.16.179.0/24"
        #   vms = {
        #     us-west-instance = {}
        #   }
        # }
      }
      # added this to remove the error, will fix later on with conditonal
      vpn-gw = {
        region = "us-east1"
        tunnel = "us-vpc"
        # The CIDR block for the asia-vpc, because the tunnel is going to the asia-vpc
        cidr = "10.178.0.0/24"
      }
    },
    asia-vpc = {
      subnets = {
        asia-subnet = {
          region = "asia-southeast1"
          zone   = "asia-southeast1-b"
          cidr   = "192.168.178.0/24"
          vms = {
            asia-instance = {}
          }
        }
      }
      # vpn gateway for the asia that connects to the eu-vpc
      vpn-gw = {
        region = "asia-southeast1"
        tunnel = "eu-vpc"
        # The CIDR block for the asia-vpc, because the tunnel is going to the asia-vpc
        cidr = "192.168.178.0/24"
      }
    }
  }

  # Create subnets list
  subnets = { for s in flatten([for vpc in keys(local.vpcs) : [for sub in keys(local.vpcs[vpc].subnets) : { subnet = sub, vpc = vpc }]]) : s.subnet => { vpc = s.vpc } }
  vms = { for s in flatten([for vpc in keys(local.vpcs) : [for sub in keys(local.vpcs[vpc].subnets) : [
  for vm in keys(local.vpcs[vpc].subnets[sub].vms) : { vm = vm, subnet = sub, vpc = vpc }]]]) : s.vm => { subnet = s.subnet, vpc = s.vpc } }

  # Create gateway list
  vpn-gws = { for s in keys(local.vpcs) : s => { region = local.vpcs[s].vpn-gw.region,
    tunnel = local.vpcs[s].vpn-gw.tunnel,
  cidr = local.vpcs[s].vpn-gw.cidr } }

}

resource "google_compute_network" "vpcs" {
  for_each = local.vpcs

  name                    = each.key
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnets" {
  for_each = local.subnets

  name          = each.key
  ip_cidr_range = local.vpcs[each.value.vpc].subnets[each.key].cidr
  region        = local.vpcs[each.value.vpc].subnets[each.key].region
  network       = google_compute_network.vpcs[each.value.vpc].id
}

# Since we're using Linux VMs for all instances except for Asia, we are using a 
# conditional if the vpc and subnet use windows machine
# not comfortable using a loop inside of a loop due to confusion and increasing time complexity from Big O(n) to O(n^2)
resource "google_compute_instance" "vms" {
  for_each = local.vms

  name = each.key
  # local.vpcs[each.value.vpc]
  # local.vpcs["asia-vpc"].subnets["asia-subnet"].zone = "asia-southeast1-b"
  # if the zone is asia-southeast1-b, then the machine type is windows
  zone = local.vpcs[each.value.vpc].subnets[each.value.subnet].zone
  # machine_type = "e2-medium"
  # if the zone is asia-southeast1-b, then "n2-standard-4", else it is "e2-medium"
  machine_type = each.value.vpc == "asia-vpc" && each.value.subnet == "asia-subnet" ? "n2-standard-4" : "e2-medium"

  boot_disk {
    initialize_params {
      # image = "debian-cloud/debian-12"
      image = each.value.vpc == "asia-vpc" && each.value.subnet == "asia-subnet" ? var.windows_image : var.linux_image
    }
  }

  network_interface {
    network = google_compute_network.vpcs[each.value.vpc].id
    # network    = google_compute_network.vpcs["eu-vpc"].id
    subnetwork = google_compute_subnetwork.subnets[each.value.subnet].id
    # subnetwork = google_compute_subnetwork.subnets["eu-subnet"].id

    # if vpc is not eu-vpc, and subnet is not eu-subnet, access_config
    dynamic "access_config" {
      # The for_each acting like an "if" condition. If the condition is true,
      # instead of using if else statement for each vpc and subnet, we use if it's not the eu-vpc and eu-subnet,
      # which include every instance that is not in the eu-vpc and eu-subnet
      # a list with one element ([1]) is created, and one "access_config" block is created.
      # If the condition is false, an empty list ([]) is created, and no "access_config" blocks are created.
      # I don't like nested loops and will fix it later on
      for_each = each.value.vpc != "eu-vpc" && each.value.subnet != "eu-subnet" ? [1] : []

      // The content of the "access_config" block.
      content {
        // Ephemeral public IP
      }
    }
  }
}

# # # Create firewall rules to allow IAP SSH and RDP
resource "google_compute_firewall" "fw-iap" {
  for_each = local.vpcs

  name    = "fw-iap-ssh-rdp-${each.key}"
  network = google_compute_network.vpcs[each.key].id
  # network     = google_compute_network.vpcs["eu-vpc"].id
  description = "Firewall rules to allow IAP SSH"

  allow {
    protocol = "tcp"
    ports    = ["22", "3389"]
  }

  source_ranges = ["35.235.240.0/20"]
}

# ********* Working *********

# # # Reserve 2 external IP addresses to use when we create the VPN gateways for Asia and Europe, 
# # # because they have the vpn-gw map block
resource "google_compute_address" "ipv4s" {
  for_each = local.vpn-gws

  name   = "ipv4-${each.key}"
  region = each.value.region
}


# Create the VPN tunnels, by looping through the vpn-gw map block in asia and europe
resource "google_compute_vpn_gateway" "vpn-gws" {
  for_each = local.vpn-gws

  name    = "vpn-gw-${each.key}"
  region  = each.value.region
  network = google_compute_network.vpcs[each.key].id
}

# **** Hard Coded VPN Gateway EU ****
# resource "google_compute_vpn_gateway" "eu_gw" {
#   name    = "eu-vpn-gw"
#   region  = google_compute_subnetwork.subnets["eu-subnet"].region
#   network = google_compute_network.vpcs["eu-vpc"].id
# }


# # # **** Hard Coded VPN Gateway Asia ****

# resource "google_compute_vpn_gateway" "asia-vpn-gw" {
#   name    = "asia-vpn-gw"
#   region  = google_compute_subnetwork.subnets["asia-subnet"].region
#   network = google_compute_network.vpcs["asia-vpc"].id
# }


# # We have to create the forwarding rules for the VPN tunnels
# # when 3 use the console the 3 ("ESP","UDP 500", "UPD 4500") forwarding rules are created

# ESP forwarding rule
# getting an error in this block
resource "google_compute_forwarding_rule" "esp" {
  for_each = local.vpn-gws

  name        = "fr-esp-${each.key}"
  ip_protocol = "ESP"
  # include the IP address that was requested
  region     = each.value.region
  ip_address = google_compute_address.ipv4s[each.key].address
  target     = google_compute_vpn_gateway.vpn-gws[each.key].id
}


# UDP 500 forwarding rule
resource "google_compute_forwarding_rule" "udp-500" {
  for_each = local.vpn-gws

  name        = "fr-udp500-${each.key}"
  ip_protocol = "UDP"
  port_range  = "500"
  region      = each.value.region
  ip_address  = google_compute_address.ipv4s[each.key].address
  target      = google_compute_vpn_gateway.vpn-gws[each.key].id
}

# UDP 4500 forwarding rule
resource "google_compute_forwarding_rule" "udp-4500" {
  for_each = local.vpn-gws

  name        = "fr-udp4500-${each.key}"
  ip_protocol = "UDP"
  port_range  = "4500"
  region      = each.value.region
  ip_address  = google_compute_address.ipv4s[each.key].address
  target      = google_compute_vpn_gateway.vpn-gws[each.key].id
}

# Connecting the 2 VPN gateways
resource "google_compute_vpn_tunnel" "tunnels" {
  for_each = local.vpn-gws

  name          = "vpn-tunnel-${each.key}"
  peer_ip       = google_compute_address.ipv4s[each.value.tunnel].address
  shared_secret = "mysecret"

  target_vpn_gateway = google_compute_vpn_gateway.vpn-gws[each.key].id
  # fix later on to use traffic from asia and europe
  # if it's europe local traffic selector from europe, cidr ip range (vice versa)
  local_traffic_selector = ["0.0.0.0/0"]
  # if it's europe remote traffic selector from asia, cidr ip range (vice versa)
  remote_traffic_selector = ["0.0.0.0/0"]

  depends_on = [
    google_compute_forwarding_rule.esp,
    google_compute_forwarding_rule.udp-500,
    google_compute_forwarding_rule.udp-4500
  ]
}

# Create the routes for the VPN tunnels
resource "google_compute_route" "routes" {
  for_each = local.vpn-gws

  name       = "route-${each.key}"
  network    = google_compute_network.vpcs[each.key].id
  dest_range = each.value.cidr
  priority   = 1000

  next_hop_vpn_tunnel = google_compute_vpn_tunnel.tunnels[each.key].id
}
# # # 

