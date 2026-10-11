# Pipe in a Pipe

A learning project for deploying and managing GitHub-based application workflows with Terraform and Docker.

## Overview

This project demonstrates:
- A Flask backend
- A React frontend
- Docker containerization
- Terraform infrastructure provisioning
- GitHub OAuth flow for user sign-in
- Deployment orchestration for app repos

## Local setup

### Backend

```bash
cd backend-flask
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python application.py
```

### Frontend

```bash
cd client
npm install
npm start
```

## Notes

This repository was sanitized to remove secrets and credentials before being mirrored to a personal repo.
