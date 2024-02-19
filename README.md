**Live Website**: [www.technologyfruit.com](https://www.technologyfruit.com/)


**Component chosen to be highlighted**: [RatingSystem](https://github.com/ApollosSevere/techfruit-fe-workspace/blob/main/app/(dashboard)/(routes)/teacher/courses/%5BcourseId%5D/_components/rating-system.tsx)

The RatingSystem component is a reusable React component that allows users to rate 
items by clicking on stars, with the ability to customize the number of stars displayed. 
Thanks for the opportunity :) 

<!-- <img src="rating_system.jpeg" alt="Photo of Rating System" width="550"> -->

<!-- <video width="1000" controls autoplay loop>
  <source src="techfruit-rating-example.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video> -->

<!-- Replace "YOUR_EMBED_CODE_HERE" with the actual embed code provided by YouTube or Vimeo -->
<iframe width="1000"  src="https://www.youtube.com/embed/VfWXQ6UABhk" frameborder="0" allowfullscreen></iframe>

<br>

# TechnologyFruit Frontend Workspace

Welcome to the TechnologyFruit Frontend Workspace repository! This application serves as a Course Management System.

# The Backend for this Web Application

Java SpringBoot Microservices deployed through AWS powers this application

| GitHub Link         | Description                              |
| :-------------- | :--------------------------------------- |
| [api-gateway](https://github.com/ApollosSevere/TechnologyFruit-Micorservices-Gateway-Service) | Directs all traffic to appropriate service |
| [auth-service](https://github.com/ApollosSevere/TechnologyFruit-Micorservices-Auth-Service) | Spring Boot 3.0 Security with JWT Implementation |
| [course-service](https://github.com/ApollosSevere/TechnologyFruit-Microservices-course-service) | Manages courses within the TechnologyFruit ecosystem |

# Microservice CI/CD Pipeline

This pipeline automates the deployment process of a microservice on an AWS EKS cluster. It includes stages for Git checkout, Maven build, SonarQube static code analysis, AWS ECR image build and push, EKS cluster connection, and deployment on the EKS cluster.

## Prerequisites

- Jenkins with necessary plugins installed.
- AWS IAM user with appropriate permissions for ECR, EKS, and necessary resources.
- SonarQube server with projects set up for static code analysis.
- Maven configured on the Jenkins server.
- Terraform installed on the Jenkins server if using Terraform for EKS cluster creation (currently commented out).

## Pipeline Configuration

The pipeline is configured using a Jenkinsfile. It includes parameters for:
- `action`: Choose between `create` or `delete` to create or destroy resources.
- `aws_account_id`: AWS Account ID where resources will be deployed.
- `Region`: AWS region where resources will be deployed.
- `ECR_REPO_NAME`: Name of the ECR repository.
- `cluster`: Name of the target EKS cluster.

## Pipeline Overview

The pipeline is defined using Jenkins declarative pipeline syntax. It consists of several stages, each responsible for a specific part of the deployment process:

1. **Git Checkout**: Checks out the code from the Git repository.

2. **Unit Test Maven**: Runs unit tests using Maven.

3. **Integration Test Maven**: Runs integration tests using Maven.

4. **Static Code Analysis: Sonarqube**: Analyzes the code for quality using SonarQube.

5. **Quality Gate Status Check: Sonarqube**: Checks the quality gate status in SonarQube.

6. **Maven Build: Maven**: Builds the project using Maven.

7. **AWS Image Build: ECR**: Builds Docker images and stores them in Amazon ECR (Elastic Container Registry).

8. **AWS Image Scan: Trivy**: Scans Docker images for vulnerabilities using Trivy.

9. **AWS Image Push: ECR**: Pushes Docker images to Amazon ECR.

10. **AWS Image Cleanup: ECR**: Cleans up old Docker images from Amazon ECR.

11. **Connect to EKS**: Configures access to the AWS EKS (Elastic Kubernetes Service) cluster.

12. **Deployment on EKS Cluster**: Deploys the application on the AWS EKS cluster using Kubernetes (kubectl).


## Pipeline Configuration

The pipeline is defined using Jenkins pipeline syntax. You can customize it by modifying the `Jenkinsfile-AWS-Pipeline` in this repository. Adjust the stages, parameters, and steps as needed to fit your project requirements.
