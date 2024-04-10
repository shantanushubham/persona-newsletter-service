# Persona Newsletter Service

This is a Node.js server side backend application that serves as an assignment submission for Shantanu Shubham for assessent of his candidacy for open Software Engineering positions at Persona.

It is a service which will send pre-decided content to a specific set of users/subscribers at specified intervals/time.

### Setup
1. Install Docker
2. Run `docker-compose up --build` to start the server.

### Pitfalls
- When a certain news content is to be sent to a list of email addresses of the subscribes of that respective topic, the service sends the email one-by-one which will increase the overhead significantly. This is because of limitations of `nodemailer` and can be fixed by using [SendGrid](https://sendgrid.com/en-us)/[Brevo](https://www.brevo.com) as an alternative.

### Improvements
- It currently uses a CRON job to send the emails to the subscribers. But this should be handled using a Queue based system where systems can subscribe and publish events. For instance, by using AWS SQS or GCP Pub/Sub.