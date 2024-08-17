# Social Network API

## Description

The Social Network API is a backend application built using Node.js, Express.js, and MongoDB. This API enables users to share thoughts, react to friends’ thoughts, and manage a list of friends. The application is designed to handle large amounts of unstructured data and utilizes the Mongoose ODM for data modeling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Thought Routes](#thought-routes)
  - [Reaction Routes](#reaction-routes)
  - [Friend Routes](#friend-routes)
- [Models](#models)
  - [User Model](#user-model)
  - [Thought Model](#thought-model)
  - [Reaction Schema](#reaction-schema)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Seanecrocker/Social-Network-API.git

2.	Install dependencies:
Navigate into the project directory and run the following command: npm install

npm install

3.	Set up MongoDB:
Make sure MongoDB is installed on your machine. Start MongoDB by running:

mongod

4.	Start the application:
To start the server, run:

npm start

The server will run on http://localhost:3001.

## Usage

Use Insomnia, Postman, or any other API client to test the API endpoints. The API supports operations like creating users, adding thoughts, reacting to thoughts, and managing a list of friends.

## API Endpoints

User Routes

	•	GET /api/users: Get all users.
	•	GET /api/users/:id: Get a single user by their ID.
	•	POST /api/users: Create a new user.
	•	PUT /api/users/:id: Update a user by their ID.
	•	DELETE /api/users/:id: Delete a user by their ID.

Thought Routes

	•	GET /api/thoughts: Get all thoughts.
	•	GET /api/thoughts/:id: Get a single thought by its ID.
	•	POST /api/thoughts: Create a new thought.
	•	PUT /api/thoughts/:id: Update a thought by its ID.
	•	DELETE /api/thoughts/:id: Delete a thought by its ID.

Reaction Routes

	•	POST /api/thoughts/:thoughtId/reactions: Create a reaction to a thought.
	•	DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction by its ID.

Friend Routes

	•	POST /api/users/:userId/friends/:friendId: Add a friend to a user’s friend list.
	•	DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user’s friend list.

## Models

User Model

	•	username: String (Unique, Required, Trimmed)
	•	email: String (Required, Unique, Must match a valid email address)
	•	thoughts: Array of _id values referencing the Thought model
	•	friends: Array of _id values referencing the User model (self-reference)

Thought Model

	•	thoughtText: String (Required, Must be between 1 and 280 characters)
	•	createdAt: Date (Default value is the current timestamp, with a getter method to format the timestamp on query)
	•	username: String (Required, The user that created this thought)
	•	reactions: Array of nested documents created with the reactionSchema

Reaction Schema

	•	reactionId: ObjectId (Default value is set to a new ObjectId)
	•	reactionBody: String (Required, 280 character maximum)
	•	username: String (Required)
	•	createdAt: Date (Default value is the current timestamp, with a getter method to format the timestamp on query)

## Walkthrough Video

A walkthrough video demonstrating the functionality of the Social Network API can be found at the following link: https://youtu.be/dSr1Sdx3Yus 

Walkthrough Video

This video covers:

	•	How to start the application server.
	•	Demonstration of GET routes for all users and all thoughts.
	•	Demonstration of GET routes for a single user and a single thought.
	•	Testing of POST, PUT, and DELETE routes for users and thoughts.
	•	Testing of POST and DELETE routes for a user’s friend list.
	•	Testing of POST and DELETE routes for reactions to thoughts.