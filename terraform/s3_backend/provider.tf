terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  # Uncomment and configure for S3 backend
  # backend "s3" {
  #   bucket = "YOUR_S3_BUCKET_NAME"
  #   key    = "terraform/pipe-in-a-pipe/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Deployment = "Pipe In A Pipe"
      Team       = "Your Team"
    }
  }
}
