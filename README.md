# DiscordBotManager
## About

A Spring Boot microservices architecture for managing a Discord bot through a web dashboard. The current idea is that all the different microservices are contained within this monorepo and then seperately deployed to individual containers using CI/CD scripts to keep the codebase standardized and easily visible.

![alt text](https://github.com/FHICT-S-Owen/S3-IPS-DOCS/blob/main/Container_diagram_v2.jpg?raw=true)

To seperate all these containers while using a monorepo there will be seperate subfolders in this repository that contain the different microservices. These microservices will each have their own development branch branch, furthermore commits will only be pulled through to the production branch once they have been properly tested and deployed at least once.

## Disclaimer

This repository will make use of Spring Boot to create the different microservices. As setting up HTTPS in Java Spring Boot requires getting an SSL certificate we'll make use of HTTP instead. This means the api calls between services are less secure.

## Getting Started

```console
Under construction
```

## Research

All of the applicable research for this project has been added to a seperate markdown file called "Research.md" to keep this README as concise as possible. If you'd like to learn more about the research that has been conducted within this project check out the abovementioned file.