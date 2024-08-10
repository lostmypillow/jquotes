# JQuotes (Work In Progress)
## What is it?
An Express API that returns a random quotes from a JSON file of quotes.

User Authentication and Favorites functionalities planned!


[**Demo**](https://lostmypillow.github.io/jquotes)

[Frontend GitHub repo](https://github.com/lostmypillow/jquotes-web)

**A REMINDER:** The website will feel slow at first because I made the frontend interact with the API hosted on Render's free tier, which is slow to start if inactive for 15 minutes, please be patient!

## How does it work?
1. Frontend requests a quote from the Express API
2. Express API unzips the data.zip file and reads JSON file
3. Server gets a random quote and sends it back to frontend

## Tech Stack
 - **Express** API endpoints
 - Frontend in plain HTML

