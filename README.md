# Pragma Brewery

First things first. Clone the repository:

    git clone https://github.com/GerhardvanZyl/pragma-brewery.git

Then setup, in the pragma-brewery directory:

    npm run setup
   
Lastly, you can run application:

    npm run run:all

The site is then available on http:localhost:3000

Other commands you can try are:

    npm run test:unit-all
    npm run lint:all
    npm run e2e

## Description
PragmaBrewery's requirement is purely to monitor the temperature of the beer containers inside the truck.

## The Code
#### Description
The solution is broken down into two parts, and my focus has been mostly on the server side and the Angular part taking a back seat. 

The server received the most attention during development and runs on node js.

It assumes that the back-end makes use of a micro services architecture, with services that are responsible for a single domain.

In the interest of being upfront, I did use Angular Cli in the generation of the application, as this is the recommended way to create applications. I did however create all the files and structure in the src directory onward by hand in the layout that prefer.

Server side I have made plenty use of mock providers, which can be easily identified by their names.

#### Gaps and outstanding functionality that would be presented in an actual production quality application
- There are of course plenty of mocks, which would be replaced with actual providers.
- Negative flows. I have logged errors where I thing appropriate, but the unit tests for negative flows are lacking, as well as displaying errors to the user. I make use of Express' error handling.
- Request and response logging.
- UI for the client app is very lackluster.
- Unit testing for the client app focus purely on logic, and as there isn't much logic on the front-end, there aren't much unit tests. 
- There is a route for retrieving notifications on the server which is never used. It does however still show my approach to software development. I instead only retrieve the full truck contents.

## Requirement elicitation
**What do you want to accomplish with the application? What is the problem that you have that you want to solve?**
The problem is that the beer gets outside of the ideal temperature and the quality suffers.

**Ideally, how would you like the application to work?**
They would like a dashboard type view showing the status of each of the containers, and have some sort of easy to see indication when a container falls outside that acceptable range. That dashboard application can then be displayed on a phone or tablet inside the truck.

**Does it need to be behind authentication?**
No, public is fine.

**Browser support?**
Shane only uses Chrome, so that is fine.

**How will the data be captured**
They will handle that, we don't need to worry about it. 
