# VPC
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc

variable "deploy_ssh_public_key" {
  description = "SSH public key used for EC2 access. Replace with your own key before provisioning."
  type        = string
  default     = "REPLACE_WITH_SSH_PUBLIC_KEY"
}

resource "aws_instance" "EC2" {
  ami                    = "ami-04505e74c0741db8d"
  instance_type          = "t2.micro"
  key_name               = "user_app_key"
  vpc_security_group_ids = [aws_security_group.ssh.id, aws_security_group.flask.id]

  tags = {
    Name = "Pipe In a Pipe"
  }
}

resource "aws_security_group" "ssh" {
  egress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    }
  ]
  ingress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = ""
      from_port        = 22
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 22
    }
  ]
}

resource "aws_security_group" "flask" {
  ingress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = ""
      from_port        = 5000
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 5000
    }
  ]
}

resource "aws_key_pair" "deployer" {
  key_name   = "user_app_key"
  public_key = var.deploy_ssh_public_key
}
