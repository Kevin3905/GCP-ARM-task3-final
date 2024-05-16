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

x = 5
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
  "content_type == video/mp4" ? "video/mp4" : "text/html"
}

if
else if,
else if,
else if,
else if,
else if,
else

"${ (condition) ? value : (elif-condition ? elif-value : else-value)}"
"${ (condition) ? value : (elif-condition ? elif-value : (elif-condition ? elif-value :
  (elif-condition ? elif-value : else-value)}"


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
