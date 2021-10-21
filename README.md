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
How can we test and deploy a medium amount of secure microservices within a monorepo?

### Research Sub-questions
1. What testing methodologies are best practice when it comes to a project with a medium sized microservice architecture?
    * What kind of testing methodologies exist?
    * How can we automate our testing using GitHub Actions?
2. How can we secure the deployment of our microservices?
    * How can we pass secret variables to our microservices?
    * How can we check that there are no security vulnerabilities within our services?
3. How can we speed up the deployment of our microservices?
    * What limitations occur when using a monorepo for CI/CD?
    
### Method
Now that the questions are formulated, we can use the DOT framework using the following methods and strategies to answer
these questions. I will assign the best suited methods and strategies to the questions.
- Literature study (question 1, 2 & 3)
- Workshop (question 2)
- Best, good, and bad practices (question 3)

### Answers
#### 1. Monorepo vs Polyrepo
To understand our sub-question we have to address a few terms that are mentioned.

First of, we have to understand what kind of architecture we will be using. The [distributed architecture](https://www.tutorialspoint.com/software_architecture_design/distributed_architecture.htm) that is used for this project is called a [microservices architecture](https://microservices.io/). Microservices are a method of developing software applications which are made up of independently deployable, modular services. Each microservice runs a unique process and communicates through a well-defined, lightweight mechanism, such as a container, to serve a business goal.

There are a few different ways on how we can save our microservices to the internet. Generally this is done using a so called [repository](https://en.wikipedia.org/wiki/Repository_(version_control)). Repositories in general host a single code-base. This is what we call a monolothic repository. 

If we follow the monolithic repository principle and apply it to our microservices it would mean that each microservice would need its own repository. This would then be called a [polyrepo](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo#:~:text=Polyrepo%20is%20a%20nickname%20that,repositories%2C%20rather%20than%20one%20repository.&text=Polyrepo%20is%20also%20known%20as%20many%2Drepo%20or%20multi%2Drepo.) (multiple repositores). However, we are going to try to host multiple microservices in the same repository. This is referred to as a [monorepo](https://en.wikipedia.org/wiki/Monorepo).

Using a monorepo to store the multiple code-bases comes with a multitude of advantages and limitations. According to Joel Parker Henderson the following key differences between mono- and polyrepo's are important. We've filtered a few of the most important differences and put them into the table below.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monorepo</th>
      <th>Polyrepo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Contents</th>
      <td>Typically a repo contains multiple projects, programming languages, packaging processes, etc.</td>
      <td>Typically a repo contains one project, programming language, packaging process, etc.</td>
    </tr>
    <tr>
      <th>Projects</th>
      <td>Manages projects in one repository, together, holistically.</td>
      <td>Manages projects in multiple repositories, separately, independently.</td>
    </tr>
    <tr>
      <th>Workflows</th>
      <td>Enables workflows in all projects simultaneously, all within the monorepo. </td>
      <td>Enables workflows in each project one at a time, each in its own repo.</td>
    </tr>
    <tr>
      <th>Changes</th>
      <td>Ensures changes affect all the projects, can be tracked together, tested together, and released together.</td>
      <td>Ensures changes affect only one project, can be tracked separately, tested separately, and released separately.</td>
    </tr>
    <tr>
      <th>Collaboration</th>
      <td>Encourages collaboration and code sharing within an organization. </td>
      <td>Encourages collaboration and code sharing across organizations.</td>
    </tr>
    <tr>
      <th>Releases</th>
      <td>Coordinated releases are inherent, yet must use a polygot of tooling.</td>
      <td>Coordinated releases must be programmed, yet can use vanilla tooling.</td>
    </tr>
    <tr>
      <th>State</th>
      <td>The current state of everything is one commit in one repo.</td>
      <td>The current state of everything is a commit per repo.</td>
    </tr>
    <tr>
      <th>Coupling</th>
      <td>Tight coupling of projects.</td>
      <td>No coupling of projects.</td>
    </tr>
    <tr>
      <th>Thinking</th>
      <td>Encourages thinking about conjoins among projects.</td>
      <td>Encourages thinking about contracts between projects.</td>
    </tr>
    <tr>
      <th>Scaling</th>
      <td>Scaling needs specialized tooling. It is currently not practical to use vanilla git with very large repos, or very large files, without any extra tooling. For monorepo scaling, teams invest in writing custom tooling and providing custom training.</td>
      <td>Scaling needs specialized coordination. It is currently not practical to use vanilla git with many projects across many repos, where a team wants to coordinate code changes, testing, packaging, and releasing. For polyrepo scaling, teams invest in writing coordination scripts and careful cross-version compatibility.</td>
    </tr>
  </tbody>
</table>

### Sources
1. [General explanation of what a repository is - Wiki](https://en.wikipedia.org/wiki/Repository_(version_control))
2. [General explanation of what a monorepo is - Wiki](https://en.wikipedia.org/wiki/Monorepo)
3. [Tutorial playlist on microservices in Java - Java Brains](https://youtube.com/playlist?list=PLqq-6Pq4lTTZSKAFG6aCDVDP86Qx4lNas)
4. [Benefits and challenges of using monorepo development practices - CircleCi](https://circleci.com/blog/monorepo-dev-practices/)
5. [Monorepo vs Polyrepo - Joel Parker Henderson](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo)
