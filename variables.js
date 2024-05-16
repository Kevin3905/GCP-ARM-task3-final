


variable types:

string = "this is a string"
number = 23
bool = true or false

list(string) = ["list", "list2", "list"]

map(string) = {
  name = "Serge"
  day = "Friday"
}

map.day

variable "string_type" {
  type = string
  desciption = "this is a string"
  default = "Serge"
}

variable "number_type" {
  type = number
  desciption = "number type"
  default = 232
}

variable "list_type" {
  type = list(string)
  desciption = "A list of strings"
  default = ["element1", "element2"]
}

variable "map_type" {
  type = map(string)
  description = "similar to dictionary in Python"
  default = {
    name = "Marvin"
    day = "first day"
  }
}

variable "vpc" {
  type = map(map(string))
  desciption = "map of a map of strings"
  default = {
    us_east_vpc = {
      name = "us-east-peer"
    }
    subnet {
      name = "us-east-peer-subnet"
      ip_cidr_range = "10.23.11.0/24"
    }
  }
}

var.vpc.us_east_vpc.name
var.vpc.subnet.name


variable "machine_types" {
  type        = map(map(string))
  description = "values for the machine types"
  default = {
    windows = {
      image        = "projects/windows-cloud/global/images/windows-server-2022-dc-v20240415"
      size         = "120"
      type         = "pd-balanced"
      machine_type = "n2-standard-4"
    }
    linux = {
      image        = "debian-cloud/debian-12"
      size         = "10"
      type         = "pd-standard"
      machine_type = "e2-medium"
    }
  }
}

for_each = var.machine_types
each.windows.key = each.windows.value

variable "windows_image" {
  type = string
  desciption = "this is description"
  default = "windows machine"
}

image        = "projects/windows-cloud/global/images/windows-server-2022-dc-v20240415"
size         = "120"
type         = "pd-balanced"
machine_type = "n2-standard-4"
image        = "debian-cloud/debian-12"
size         = "10"
type         = "pd-standard"
machine_type = "e2-medium"









JSON --> JavaScript Object Notation

let x = 5

if (x == 5) {
  "true"
} else {
  "false"
}

condition ? exprIfTrue : exprIfFalse
// x is equal to 5 ? this if its true : (false) else (otherwise)
x == 5 ? "True" : "false"
x == 7 ? "True" : "False"

if, else if, else

if (x == 5) {
  "True"
} else if (x == 7) {
  "x is 7"
} else {
  "false"
}

condition ? exprIfTrue : exprIfFalse
(condition) ? exprIfTrue : (condition ? exprIfTrue : exprIfFalse)

x = 7
(x == 5) ? "True" : (x == 7 ? "x is 7" : "false")
x = 5 --> "True"

x = 7 --> "x is 7"

x = 100 --> "false "


29

(x == 5) ? "True" : (x == 7 ? "x is 7" : "false")
x == 5 ? "True" : "false"
locals {
  test = "${ condition ? value : (elif-condition ? elif-value : else-value)}"
  test2 = "${condition ? value : else-value}"
}

x <= 5 ? "True" : "false"

b = "blue"
r = "orange"

b == "blue" ? "True" : "false" --> "True"
r == "red" ? "True" : "False"  --> "False"

resource "google_storage_bucket_object" "upload_html" {
  for_each     = fileset("${path.module}/", "*.html")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "text/html"
}

// Uploading and setting public read access for HTML files
resource "google_storage_bucket_object" "upload_image" {
  for_each     = fileset("${path.module}/", "*.jpg")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "image/jpg"
}

resource "google_storage_bucket_object" "upload_video" {
  for_each     = fileset("${path.module}/", "*.jpg")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "video/mp4"
}

resource "google_storage_bucket_object" "upload_video" {
  for_each     = fileset("${path.module}/", "*.jpg")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "video/mp4"
}

resource "google_storage_bucket_object" "upload_video" {
  for_each     = fileset("${path.module}/", "*.jpg")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "video/mp4"
}

resource "google_storage_bucket_object" "upload_video" {
  for_each     = fileset("${path.module}/", "*.jpg")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "video/mp4"
}

resource "google_storage_bucket_object" "upload_video" {
  for_each     = fileset("${path.module}/", "*.jpg")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "video/mp4"
}

resource "google_storage_bucket_object" "upload_files" {
  for_each     = fileset("/files")
  bucket       = google_storage_bucket.bucket.name
  name         = each.value
  source       = "${path.module}/${each.value}"
  content_type = "(${content_type == *.jpg})" ? "image/jpg" :
  "content_type == *.mp4" ? "video/mp4" : "text/html"
}

titties.mp4
legs.mp4
doc.mp4

*.mp4

if
else if,
else if,
else if,
else if,
else if,
else

"${ (condition) ? value : (elif-condition ? elif-value : else-value)}"
"${ (condition) ? value : (elif-condition ? elif-value : (elif-condition ? elif-value :(elif-condition ? elif-value : else-value)}"

String interpolation

a = 5
"${a}-is 5"
"5-is 5"

map(object{
  name = String
  vpc = map
  tags = list
})

default = {
  name = "Serge"
  vpc = {
    name = "us-west-vpc"
    ip_cidr_range = "0.0.0.0/0"
  }
  tags = ["http", "icmp", "rdp"]
}


x ==a == IIIAcadmey ? "true" : "false"
b == DuneAcademy ? "true" : "false"


Variable "a" {
  type = string
  desciption "variable"
  default = "IIIAcadmey"
}

Variable "b" {
  type = string
  desciption "variable"
  default = "Titties"
}

a == "IIIAcadmey" ? "true" : "false"
b == "DuneAcademy" ? "true" : "I want titties"

D = 22
D == 22 ? "true" : "false" ---> "true"
D == 24 ? "true" : "false" ---> "false"


kesha = "problems"
Certs = "passport bros/sub women"

(if kesha is equal to "happiness in life")? "true" or "false"
kesha == "happiness in life" ? "true" : "false" ---> "False"
Certs == "passport bros/sub women" ? "true" ; "false" ---> "True"

McHenry = 34

McHenry age is 38 ? true or false
McHenry == 34 ? "true" : "false"
