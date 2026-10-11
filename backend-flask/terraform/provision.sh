#!/bin/bash

terraform init
terraform apply --auto-approve

# Note: Replace SSH_PRIVATE_KEY_PATH with your actual SSH key path
# ssh -i "SSH_PRIVATE_KEY_PATH" -o "StrictHostKeyChecking no" ubuntu@$(terraform output -raw instance_pub_ip)
scp -i "${SSH_PRIVATE_KEY_PATH}" -o "StrictHostKeyChecking no" ../Dockerfile ubuntu@$(terraform output -raw instance_pub_ip):/home/ubuntu
ssh -i "${SSH_PRIVATE_KEY_PATH}" ubuntu@$(terraform output -raw instance_pub_ip) 'bash -s' < build.sh $1 $2
