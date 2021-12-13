# Portfolio

This portfolio has been created to prove that during the third semester of my studies, I satisfied the various learning outcomes using the different references given below as proof. Each of the different sections below will explain why I think I achieved a certain score, in agreement with my teacher. Each of the section titles have "LO" in their name which stands for learning outcome. An overview of what my project is about can be read in the [README.md](https://github.com/FHICT-S-Owen/DiscordBotManager#readme) file.

## LO 1 - Web Application

You design and build **user-friendly**, **full-stack** web applications. The proof that I've written about in the sub-sections below should suffice for this learning outcome to be proficient. 

### User-friendliness
You apply basic User experience testing and development techniques.

To validate user-friendliness my teacher and I discussed the different ways in which this can be done. We came to the conclusion that testing for user-friendliness can also be achieved on my monorepo itself. I've created a GitHub issue with [repository feedback](https://github.com/FHICT-S-Owen/DiscordBotManager/issues/42) as title. This issue serves as a gathering place for validating the user-friendliness of my repo by commenting.

### Full-stack
You design and build a full stack application using commonly accepted front end (Javascript-based framework) and back end techniques (e.g. Object Relational Mapping) choosing and implementing relevant communication protocols and addressing asynchronous communication issues.

Within this repo is a full stack application that contains a web dashboard with basic authentication using Vue. The back-end consists of multiple microservices written in Java using the Spring framework and a Discord bot that together form the back-end.

## LO 2 - Software Quality
You use software **tooling and methodology** that continuously monitors and improve the software quality during software development.

From the perspective of the customer it would be very important to be able to show that your code performs like described using the user story and that your code runs without having problems. We can achieve this by running code quality analysis tools and by writing various tests for our code. This is exactly what I did in this project. The LoggingService folder contains a microservice that has various tests that can prove that the acceptance criteria have been met if these tests succeed. The composition of the various tests can be viewed in [this](https://github.com/FHICT-S-Owen/DiscordBotManager/tree/Production/LoggingService/src/test/java/com/owendb/loggingservice) folder.

![Screenshot of tests passing](https://github.com/FHICT-S-Owen/S3-IPS-DOCS/blob/main/Screenshot_LogginService_Tests.png?raw=true)

The screenshot below shows a summary page of sonarcloud, which I use for code quality analysis itself.

![Screenshot of tests passing](https://github.com/FHICT-S-Owen/S3-IPS-DOCS/blob/main/Screenshot_SonarCloud.png?raw=true)

For this learning outcome I have been able to achieve what I wanted and am on the same page as is required for this LO to be proficient.

## LO 3 - CI/CD
You **design and implement** a (semi)automated software release process that matches the needs of the project context.

Because I use a monorepo to contain all of my projects some interesting challenges appeared that I had to try and solve with the small amount of knowledge I had about both CI/CD and Monorepo's. Using the research as a way to document my findings I think that I have definitely achieved more than enough to have this LO be on an advanced level.

## LO 4 - Professional
You act in a **professional manner** during software development and learning. I achieved this by communicating and asking feedback regularly from peers and teachers, performing research with a fellow student and managing the entirety of the project through a public project page that is attached to this repository. The abovementioned 3 things will be elaborated upon in the sections below. I think that I have been able to achieve a lot of things within this LO as well and expect this to be on a proficient level.

### Feedback
After having a feedback moment with my teacher I'd write down all the feedback that the teacher had for me in a summary on the school page called FeedPulse. In this section I'll show you some of these summaries in the form of screenshots that I've taken directly from the FeedPulse page. The smiley is the teachers rating on this summary which is very positive.

![Screenshot of FeedPulse](https://github.com/FHICT-S-Owen/S3-IPS-DOCS/blob/main/Screenshot_FeedPulse.png?raw=true)

### Research

The research paper that Siem Lucassen and I wrote together about monorepo deployment can be found in the [Research.md](https://github.com/FHICT-S-Owen/DiscordBotManager/blob/Production/Research.md) file. We got feedback from our teacher during the writing process and applied it as much as possible.

### Project management

My teacher also came up with the idea to use GitHub projects to keep my progress as transparent as possible together with the repository being public. Using GitHub projects has given me a lot of insight into keeping a perspective that is friendly towards outsiders. 

![Screenshot of GitHub Projects page](https://github.com/FHICT-S-Owen/S3-IPS-DOCS/blob/main/Screenshot_Projects.png?raw=true)