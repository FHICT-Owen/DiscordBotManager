# DiscordBotManager
## About

A Spring Boot microservices architecture for managing a Discord bot through a web dashboard. The current idea is that all the different microservices are contained within this monorepo and then seperately deployed to individual containers using CI/CD scripts to keep the codebase standardized and easily visible.

![alt text](https://github.com/FHICT-S-Owen/S3-IPS-DOCS/blob/main/Container_diagram_v2.jpg?raw=true)

To seperate all these containers while using a monorepo there will be seperate sub folders in this repo that contain the different microservices. These microservices will each have their own development branch branch, furthermore commits will only be pulled through to the production branch once they have been properly tested and deployed at least once.

## Disclaimer

This repository will make use of Spring Boot to create the different microservices. As setting up HTTPS in Java Spring Boot requires getting an SSL certificate we'll make use of HTTP instead. This means the api calls between services are less secure.

## Getting Started

```console
Under construction
```

## Research

Before creating the project I'll have to do research on the implications of using a monorepo vs a polyrepo and how I can possibly make my application more secure when getting an SSL certificate is out of the question to be able to use HTTPS. Furthermore I would like to look into the implications of automating my testing using GitHub Actions.

### Main research question
How can we rapidly develop secure microservices that are easy to deploy to the web?

### Research Sub-questions
1. Why would you rather use a monorepo versus a polyrepo for microservices?
    * What are repo's?
    * What are microservices
    * What effects do monorepo's have on CI/CD vs polyrepo's?
2. What alternatives to securing API's using HTTPS are available?
    * How does HTTP compare to HTTPS?
    * Is it better to encrypt your API data calls or to just send encrypted login details with the calls?
3. What general testing methodologies are best practice when it comes to Microservices?
    * What kind of testing methodologies exist?
    * How can we automate our testing using GitHub Actions?
    

### Method
Now that the questions are formulated, we can use the DOT framework using the following methods and strategies to answer
these questions. I will assign the best suited methods and strategies to the questions.
- Best, good, and bad practices (both questions)
- Literature study (both questions)
- Workshop (question 2)
