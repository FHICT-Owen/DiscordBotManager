# DiscordBotManager
## About

A distributed microservices architecture for managing a Discord bot through a web dashboard. The current idea is that all the different microservices are contained within this monorepo and then seperately deployed to individual containers using CI/CD scripts to keep the codebase standardized and easily visible.

## Disclaimer

This repository will make use of Spring Boot to create the different microservices. As setting up HTTPS in Java Spring Boot requires getting an SSL certificate we'll make use of HTTP instead. This means the api calls between services are less secure.

## Getting Started

```console
Under construction
```

## Research

Before creating the project I'll have to do research on the implications of using a monorepo vs a polyrepo and how I can possibly make my application more secure when getting an SSL certificate is out of the question to be able to use HTTPS.

### Research Questions
1. Why would you rather use a monorepo versus a polyrepo for microservices?
    * What are repo's?
    * What are microservices
    * What effects do monorepo's have on CI/CD vs polyrepo's?
2. What alternatives to securing API's using HTTPS are available?
    * How does HTTP compare to HTTPS?

### Method
Now that the questions are formulated, we can use the DOT framework using the following methods and strategies to answer
these questions. I will assign the best suited methods and strategies to the questions.
- Best, good, and bad practices (both questions)
- Literature study (both questions)
- Workshop (question 2)
