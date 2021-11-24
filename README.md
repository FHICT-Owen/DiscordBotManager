# DiscordBotManager
## About

A Spring Boot microservices architecture for managing a Discord bot through a web dashboard. The current idea is that all the different microservices are contained within this monorepo and then seperately deployed to individual containers using CI/CD scripts to keep the codebase standardized and easily visible.

![alt text](https://github.com/FHICT-S-Owen/S3-IPS-DOCS/blob/main/Container_diagram_v2.jpg?raw=true)

To seperate all these containers while using a monorepo there will be seperate subfolders in this repository that contain the different microservices. These microservices will each have their own development branch branch, furthermore commits will only be pulled through to the production branch once they have been properly tested and deployed at least once.

## Tracking progress & Contributing

This GitHub repo makes use of GitHub issues and GitHub projects to keep track of the current progress. If there are any new features that you would like to implement create a pull request with a dedicated issue to quickly summarize what you changed. If you have a new idea that might change some of the core aspects of this project you can also create an issue for it.

## Disclaimer

Currently this project is still being worked on. This means that the setup guide will most likely change in the future as the project progresses. As an example, the current GitHub actions are set up to deploy to heroku, but for microservices you'd much rather deploy to a dedicated platform like google cloud services or a docker swarm. Furthermore, not all .env variables are injected on deploy as of yet. In Heroku you can further define any needed .env variables or config lines.

## Getting Started
If you'd like to make use of this project for your own Discord bot please follow the folowing steps:

1. Fork this repo using your preferred method
2. Make sure that you use the same branch names or change the _pull workflows to work with your branch names
3. Set up all of the secrets that the workflows require
4. Add environment variables that the microservices can use
5. Add a config.json for the Discord bot or add your own Discord bot to this system by forking the eureka-helper.js file to send a heartbeat to Eureka
6. If you add your own bot, set up your API calls and API endpoints within the Discord bot
7. Go to the Github Actions page of your own Repo and trigger workflows manually to start testing and deploying them if they haven't triggered automatically by doing commits

You can also test run all of the applications by using an IDE for the Java microservices and the folowing commands to run the Discord bot:

```console
$ npm i --save
$ node index.js [portnumber for the receiving API]
```

## Research

All of the applicable research for this project has been added to a seperate markdown file called "[Research.md](https://github.com/FHICT-S-Owen/DiscordBotManager/blob/research/Research.md)" to keep this README as concise as possible. If you'd like to learn more about the research that has been conducted within this project check out the abovementioned file.