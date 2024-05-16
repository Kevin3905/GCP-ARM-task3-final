variable "map_type" {

}

types:
string -> "this is a string"
number -> 23
bool -> true or false
list -> ["element0", "element1"]
map -> {
  name = "Serge"
  day = "Saturday"
}
map.name -> "Serge"

map -> {
  number = 23
  number2 = 44
}

variable "string" {
  type = string
  description = "Optional"
  default = "Serge"
}

variable "number" {
  type = number
  description = "Teddy like big titties"
  default = 223
}

variable "bool" {
  type = bool
  description = "this is either true or false"
  default = true
}

lists can have duplicate elements

variable "list" {
  type = list(string)
  description = "similar to an array, starts at 0 index"
  default = ["element 0", "element 1", "element 2", "element 0", "element 1"]
}

set is similar to list only difference is the values (elements) have to be unique

variable "set" {
  type = set(string)
  description "The elements must be unique"
  default = ["elm 0", "elm 1", "elm 2"]
}

Key value pairs
variable "map" {
  type = map(string)
  description = "A map of element"
  default = {
    name = "Serge"
    another-name = "JD"
    name3 = "Teddy"
  }
}

Map of Map of Strings

varibale "map" {
  type = map(map(string))
  description = "Map of a map containing strings"
  default = {

    groups = {
      name1 = "Serge"
      name2 = "Teddy"
    }

    teams = {
      name = "McHenry"
      name2 = "JD"
    }
  }
}



map of map of Strings
cars -> model -> name of the model

tesla : model : name = "model3"
tesla : model : another-name =  "cybertruck"

ford : model : name = "Mustang"
ford : model : another-name = "f150"



variable "cars" {
  type        = map(map(string))
  description = "cars"
  default = {
    tesla = {
      model      = "model3"
      anothername = "cybertruck"
    }
    ford = {
      model       = "cybertruck"
      anothername = "f150"
    }
  }
}

variable "map" {
  type = map(map(string))
  description = "Types of cars"
  default = {
    tesla = {
      name1 = "model3"
      name2 = "cybertruck"
    }
    ford = {
      name1 = "f150"
      name2 = "mustang"
    }
  }
}




# a map has key = value pairs
variables "map" {
  type = map(map(string))
  description = "a map of map containing string"
  default     = {
    tesla = {
      model1 = "model3"
      model2 = "modely"
    }
    ford = {
      model1 = "focus"
      model2 = "mustang"
    }
}


variable "map"
 type = map(map(string))
 description = "map of a map containing strings"
 default = {
   ford = {
     model1 = "f150"
     model2 = "Mustang"
   }
   tesla = {
     modell = "model3"
     model2 = "cybertruck"
   }
 }
}



varianle "map" {
  type = map(map(strings))
  description = "two cars"
  car1 = {
    make = audi
    model = a7
  }
  car2 = {
    make = lincoln
    model = aviator
  }
}

variable "cars" {
  type = map(map(string))
  description = "Map of cars"
  default {
    tesla = {
      model1 = "model3"
      model2 = "cybertruck"

    }
    ford {
      model1 = "Mustang"
      model2 = "f150"
    }
  }
}





variable = "map"
  type = map (map(string))
  description = "make and model of car"
    default = {
      tesla = {
        model1 = "X"
        model2 = "Y"
      }
      ford = {
        model1 = "F-150"
        model2 = "Taurus"
  }
}


variable "cars" {
  type = map(map(string))
  default = {
    tesla = {
      model1 = "model3"
      model2 = "modely"
    }

    ford = {
      model1 = "f150"
      model2 = "f250"
    }
  }
}


variable "map" {
  type = map(map(string))
  description = "Types of Cars"
  default = {
    lexus = {
      model0 = "logs460"
      model1 = "es-350"
    }
    ford = {
      model0 = "f-150"
      model1 = "explorer"
    }
  }
}



variable "map" {
  type = map(map(string))
  default = {
    tesla = {
      model1 = "model3"
    }
    ford = {
      model = "f150"
    }
  }
}


variable "map" {
  type = map(map(strings))
  description = "two cars"
  default = {
    car1 = {
      make = "audi"
      model = "a7"
    }
    car2 = {
      make = "lincoln"
      model = "aviator"
    }
  }
}

variable "map" {
  type = map(map(string))
  description = "Types of cars"
  default = {
    Honda = {
      name1 = "Civic"
      name2 = "Accord"
    }
    ford = {
      model1 = "F-150"
     model2 = "mustang"
    }
  }
}


variable "map" {
  type = map(map (string))
  description = "A Map of Cars"
  default {
    honda = {
      model1 = "accord"
      model2 =  "civic"
    }
    mazda = {
      model1 = "3"
      model2 = "6"
    }
  }
}


default = {
  tesla = {
    model = "model3"
  }
  ford = {
    model = "f150"
  }
  honda = {
    model = "civic"
  }
}

variable "cars" {
  type  =map(map(string))
  description = "Types of trucks"
  default; = {
  trucks = Prime
  trucks -> model -> name of the model

  chevy : model : name = "model3"
  chevy : model : another-name =  "cybertruck"

  semi : model : name = "Peterbilt"
  semi : model : another-name = "Freightliner Cab-over-engine"
  }
}



variable "titties" {
    type = map(map(string))
    default = {
        tesla = {
            model = "model 3"
            model = "model s"
        }

        bmw = {
            model = "x5"
            model = "m5"
        }
    }
}

variable "cars" {
  type = map(map(string))
  description = "Map of cars"
    default = {
      tesla {
        model1 = "model3"
        model2 = "cybertruck"

    }
    ford {
      model1 = "f150"
      model2 = "Mustang"

    }

}


variable "cars"{
  type = map(map(string))
  description  = "car models"
  default = {
    tesla = {
      model1 = "y"
      model2 = "x"
      model3 = "e"
    }

    ford = {
      model1 = "f150"
      model2 = "focus"
    }
  }

  cars.ford.model1

  Looping

  for_each = var.cars -> access the cars map values
  each.tesla.value -> "y", "x", "e"
  each.tesla.key -> model1, model2, model3



  variable "one_map" {
    type = map(string)
    default = {
      tesla = "model3"
      ford = "f150"
      honda = "civic"
    }
  }

Dot notation
one_map.ford


varianle "map" {
  type = map(map(strings))
  description = "two cars"
  default = {
    audi = {
      moel = "a5"
      model = "a7"
    }
    lincoln = {
      model = "crossover"
      model = "aviator"
    }
  }
}

Looping
for each element in the cars map of map of string get the audi model names:

for_each = var.map - > acces the cars map values
each.audi.value -> "a5", "a7"


each.audi.key -> moel, model




// variable "networks" {
//   description = "The networks and their subnets"
//   type = map(object({
//     name          = string
//     ip_cidr_range = string
//     region        = string
//   }))
//   default = {
//     eu = {
//       name          = "eu-vpc"
//       ip_cidr_range = "10.177.0.0/24"
//       region        = "europe-west1"
//     },
//     us = {
//       name          = "us-vpc"
//       ip_cidr_range = "10.180.0.0/24"
//       region        = "us-central1"
//     }
//   }
// }

variable "networks" {
  type = map(map(string))
  description = "Map of map to create the networks"
  default = {
    eu = {
      name          = "eu-vpc"
      ip_cidr_range = "10.177.0.0/24"
      region        = "europe-west1"
    }
    us = {
      name          = "us-vpc"
      ip_cidr_range = "172.180.0.0/24"
      region        = "us-east1"
    }
}

var.networks.eu.name

type = map(map(string))
default = {
  eu = {}
  us = {}
}
vpcs = tomap({

})
similar to map(map(string))
locals {
  vpcs = tomap({
    eu = {
        name = "eu-net"
        subnet = "10.153.0.0/24"
        region = "europe-west3"
    }
    us = {
        name = "us-net"
        subnet = "10.177.0.0/24"
        region = "us-west2"
    }
  })
}

local.vpcs.eu.name


resource "google_compute_network" "vpc" {
  for_each                = var.networks
  name                    = each.value.name
  auto_create_subnetworks = false
}

# resource "google_compute_subnetwork" "subnet" {
#   for_each                 = var.networks
#   name                     = "${each.key}-subnet"
#   ip_cidr_range            = each.value.ip_cidr_range
#   region                   = each.value.region
#   private_ip_google_access = true
#   network                  = google_compute_network.vpc[each.key].self_link
# }

each.key = each.value

Look up
  Dynamic blocks - Ingress

resource "google_compute_instance" "instance" {
  for_each     = var.networks
  name         = "${each.key}-instance"
  machine_type = "e2-small"
  zone         = "${each.value.region}-b"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.subnet[each.key].self_link
  }



  tags = ["${each.key}-instance"]
}




// Machine Type Map of Map
//
// variable "machine_types" {
//   type        = map(map(string))
//   description = "values for the machine types"
//   default = {
//     windows = {
//       image        = "projects/windows-cloud/global/images/windows-server-2022-dc-v20240415"
//       size         = "120"
//       type         = "pd-balanced"
//       machine_type = "n2-standard-4"
//     }
//     linux = {
//       image        = "debian-cloud/debian-12"
//       size         = "10"
//       type         = "pd-standard"
//       machine_type = "e2-medium"
//     }
//   }
// }

x = 5

if (x == 5) {
  "true"
} else {
  "false"
}

(condition) ? (if true) : (if false)

if (x == 7) {
  "true"
} else if (x == 10) {
  "x is 10"
} else {
  "false"
}

(condition) ? (if true) : (condition) ? (if true) : (if false)

(x == 11) ? ("true") : ((x == 7) ? ("x is 7") : ("false"))

x = 8

x > 7 true
x < 8 false
x >= 8 true
x <= 8 true
x == 8 true
x == 9 false

bag equal to
bag = "Gucci"

is bag equal to "Chanel"
bag == "Chanel"



regions = ["eu", "us", "asia"]
google_compute_instance.instance["asia"].network_interface[0].network_ip


for_each = var.regions
for key, value in google_compute_instance.instance : key => value.[attribute]
