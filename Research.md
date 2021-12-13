# Research
Before creating the project I'll have to do research on the implications of using a monorepo vs a polyrepo and how I can possibly make my application more secure when getting an SSL certificate is out of the question to be able to use HTTPS. Furthermore I would like to look into the implications of automating my testing using GitHub Actions.

## Main research question
How can we test and deploy a medium amount of secure microservices within a monorepo?

## Research Sub-questions
1. What testing methodologies are best practice when it comes to a project with a medium sized microservice architecture?
    * What kind of testing methodologies exist?
    * How can we automate our testing using GitHub Actions?
2. How can we speed up the deployment of our microservices?
    * What limitations occur when using a monorepo for CI/CD?
3. How can we secure the deployment of our microservices?
    * How can we pass secret variables to our microservices?
    * How can we check that there are no security vulnerabilities within our services?
    
## Method
Now that the questions are formulated, we can use the DOT framework using the following methods and strategies to answer
these questions. I will assign the best suited methods and strategies to the questions.
- Literature study (question 1, 2 & 3)
- Workshop (question 2)

## Answers
### 1. Monorepo vs Polyrepo
To understand our sub-question we have to address a few terms that are mentioned.

First of, we have to understand what kind of architecture we will be using. The [distributed architecture](https://www.tutorialspoint.com/software_architecture_design/distributed_architecture.htm) that is used for this project is called a [microservices architecture](https://microservices.io/). 

Microservices or otherwise known as a microservices architecture is a variant of the service-oriented architecture that arranges an application as a collection of loosely-coupled services. The goal of microservices is to bring services online that are independently deployable. Each microservice runs a unique process and communicates through a well-defined, lightweight mechanism, such as a container, to serve a business goal.<sup>[1](#Sources)</sup>

There are a few different ways on how we can save our microservices to the internet. Generally this is done using a so called [repository](https://en.wikipedia.org/wiki/Repository_(version_control)). Repositories in general host a single code-base. This is what we call a monolothic repository.<sup>[2](#Sources)</sup>

If we follow the monolithic repository principle and apply it to our microservices it would mean that each microservice would need its own repository. This would then be called a [polyrepo](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo#:~:text=Polyrepo%20is%20a%20nickname%20that,repositories%2C%20rather%20than%20one%20repository.&text=Polyrepo%20is%20also%20known%20as%20many%2Drepo%20or%20multi%2Drepo.) (multiple repositores). However, we are going to try to host multiple microservices in the same repository. This is referred to as a [monorepo](https://en.wikipedia.org/wiki/Monorepo).

Using a monorepo to store the multiple code-bases comes with a multitude of advantages and limitations. According to Joel Parker Henderson the following key differences between mono- and polyrepo's are important. We've filtered a few of the most important differences and put them into the table below.<sup>[3](#Sources)[4](#Sources) </sup>

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
      <td>Typically a repository contains multiple projects, programming languages, packaging processes, etc.</td>
      <td>Typically a repository contains one project, programming language, packaging process, etc.</td>
    </tr>
    <tr>
      <th>Projects</th>
      <td>Manages projects in one repository, together, holistically.</td>
      <td>Manages projects in multiple repositories, separately, independently.</td>
    </tr>
    <tr>
      <th>Workflows</th>
      <td>Enables workflows in all projects simultaneously, all within the monorepo. </td>
      <td>Enables workflows in each project one at a time, each in its own repository.</td>
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
      <td>The current state of everything is one commit in one repository.</td>
      <td>The current state of everything is a commit per repository.</td>
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
      <td>Scaling needs specialized tooling. It is currently not practical to use vanilla git with very large repositories, or very large files, without any extra tooling. For monorepo scaling, teams invest in writing custom tooling and providing custom training.</td>
      <td>Scaling needs specialized coordination. It is currently not practical to use vanilla git with many projects across many repositories, where a team wants to coordinate code changes, testing, packaging, and releasing. For polyrepo scaling, teams invest in writing coordination scripts and careful cross-version compatibility.</td>
    </tr>
  </tbody>
</table>

### 2. Fast deployment of microservices
The process of getting your code to run in a production or online environment can be quite a tedious job if you have to take care of it manually everytime.  When you have all of your deliverables done for a sprint or have quick fixes that you need to apply you'd want to take care of these things as quickly as possible with the least amount of effort.

In order to speed up this process we can use something called [CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd). CI/CD allows us to automate large parts of the deployment process which massively speeds up app development. We can also let CI/CD handle our testing and integration phases by adding services like [SonarCloud](https://sonarcloud.io/features) to integrate our testing, check for bugs and find vulnerabilities in the code that is written.

When it comes down to CI/CD in a monorepo we'll have to get quite creative in order to make sure each of our different projects inside the monorepo have their own CI/CD pipeline. After doing some more searching online we found out that we can create GitHub workflows, which are CI/CD pipelines, that only respond to changes on a single project. This can be done by defining a path to a subfolder like this. 
```yml
on:
  push:
    branches: Production
    paths:
      - "DiscordBot/**"
```
When done like this we can push changes to our monorepo and have the workflow trigger that is responsible for the specific project on which the changes were made. However we run into a few issues during our deployment stage within the current setup of the monorepo. Heroku, our current deployment provider, will throw an error if there files available to deploy are not structured correctly. 

The abovementioned issue can be solved by using a git function called subtree split. What subtree split does is that it creates a child repository with only the files from the project we would like to deploy.

After having applied the previously mentioned methods to the GitHub workflow we're left with a functioning CI/CD pipeline that both successfully tests and deploys a specific application from within our monorepo.

### 3. Secure deployment of microservices

When it comes to securing your microservices/api's there are several different methods and strategies you can possibly use to make it more secure.

First of all if we put our code into a public repository we need to make sure all of our variables that should be kept secret are hidden, and not stored in the codebase. We can do this in our local environment by using local config or [.env](https://www.ibm.com/docs/en/aix/7.2?topic=files-env-file) files that we don't include into our repository. When we need to go into the production stage we'll need a different way to store these variables. This is where secrets come into play. There are several different ways we can include these secrets into our project. One of these ways would be by setting up secrets in the GitHub repository and then include these secrets during CI/CD. To give an example look at the code snippet below from one of our workflows. 

```yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Heroku login credentials
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
          HEROKU_EMAIL: ${{ secrets.HEROKU_EMAIL }}
        run: |
          cat > ~/.netrc <<EOF
            machine api.heroku.com
              login $HEROKU_EMAIL
              password $HEROKU_API_KEY
            machine git.heroku.com
              login $HEROKU_EMAIL
              password $HEROKU_API_KEY
          EOF
      - name: Add backend remote origin
        run: heroku git:remote -a ${{ secrets.HEROKU_DISCORDBOT_APP_NAME }}
      - name: Deploy backend to Heroku
        run: git push heroku `git subtree split --prefix=DiscordBot --branch=Production`:refs/heads/master --force
```

the environment variables we used in the local environment (.env) can then be integrated into our application by setting these using `secrets.{secretName}`.  

A different way developers could hide secrets is by using tooling like HasiCorp Vault, Microsoft Azure Key Vault or Amazon KMS. As an example, during the second semester of our studies we used the Azure Key Vault to store our database credentials.

To make sure we don't give any hackers an easy way to get into our microservices we can use GitHub's [CodeQL](https://github.com/github/codeql) (the technology behind LGTM) analysis inside our deployment workflow to scan and test for these vulnerabilities and how well they're being maintained. 

With LGTM you can customize your analysis by writing [custom queries](https://lgtm.com/help/lgtm/writing-custom-queries) that are specific to your project or use the standard built-in queries used on LGTM that are open source. If you enable automated code reviews in LGTM, you can catch issues to prevent them from being reintroduced in the codebase, before they're merged into the default branches.

### Final conclusion
If we combine all of the abovementioned information and apply it to our microservices architecture with a medium amount of services then we have a functioning monorepo with deployable and testable microservices.

## Sources
1. [General explanation of what Microservices are - Wiki](https://en.wikipedia.org/wiki/Microservices)
2. [General explanation of what a repository is - Wiki](https://en.wikipedia.org/wiki/Repository_(version_control))
3. [Monorepo vs Polyrepo - Joel Parker Henderson](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo)
4. [Benefits and challenges of using monorepo development practices - CircleCi](https://circleci.com/blog/monorepo-dev-practices/)

## Contributors
1. [Siem Lucassen](https://github.com/SiemLuc)
