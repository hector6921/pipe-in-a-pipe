terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Deployment = "Pipe In A Pipe"
      Team       = "Kura Team 6"
    }
  }
}
