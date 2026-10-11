output "instance_pub_ip" {
  description = "Public IP of the EC2"
  value       = aws_instance.ec2.public_ip
}
