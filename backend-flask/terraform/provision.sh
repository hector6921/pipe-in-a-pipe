#!/bin/bash

terraform init
terraform apply --auto-approve

# Example usage:
# ssh -i <private-key> ubuntu@$(terraform output -raw instance_pub_ip)
scp -i <private-key> -o "StrictHostKeyChecking no" ../Dockerfile ubuntu@$(terraform output -raw instance_pub_ip):/home/ubuntu
ssh -i <private-key> ubuntu@$(terraform output -raw instance_pub_ip) 'bash -s' < build.sh $1 $2
