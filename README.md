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

## Description
Phase one of PragmaBrewery's digital transformation is purely to monitor the temperature of the beer containers inside the truck. It requires requires that someone keeps an eye on a site or app, and is obviously not ideal.
With this in mine, the monitoring web app allows plugable notifiers, that allows other notification methods to be used as they become available. 

## The Code
#### Description
The code has been purposely over-engineered for the task at hand.

The solution is broken down into two parts, and my focus has been mostly on the server side and the Angular part taking a back seat. 

The server received the most attention during development and runs on node js. It is built to be easy to maintain and extend as the product evolves. 

The different components are decoupled and makes use of dependency injection. These dependency include plugable notification providers so that different notification components can be added as necessary without requiring extensive code changes.

It also assumes that the back-end makes use of a micro services architecture, with services that are responsible for a single domain.
Additionally it makes use of a logging provider and configuration service.

All these changes will ensure that it will be easy to upgrade or even switch out components for other ones.

The above is also part of the reason why the web application is an SPA that is wholly separate from the server, which only serves a static index.html file and further relies on api calls to retrieve data.

The web application is built using Angular 8, and it makes use of a service factory to enable switching between data providers based on the environment it runs in. 

In the interest of being upfront, I did use Angular Cli in the generation of the application, as this is the recommended way to create applications. I did however create all the files and structure in the src directory onward by hand in the layout that prefer.

In both tiers, but especially server side I have made plenty use of mock providers, which can be easily identified by their names.

#### Gaps and outstanding functionality that would be presented in an actual production quality application
- There are of course plenty of mocks, which would be replaced with actual providers.
- Negative flows. I have logged errors where I thing appropriate, but the unit tests for negative flows are lacking, as well as displaying errors to the user. I make use of Express' error handling.
- Singletons - At the moment all my controllers, services and providers server-side are singletons. The controllers should only be for the life cycle of the request to ensure that the api is stateless. Some of the providers should be singletons so that they can cache data that doesn't change often.
- Request and response logging.
- UI for the client app is very lackluster.
- Unit testing for the client app focus purely on logic, and as there isn't much logic on the front-end, there aren't much unit tests. 
- There is a route for retrieving notifications on the server which is never used. It does however still show my approach to software development. I instead only retrieve the full truck contents.

## Requirement elicitation
**What do you want to accomplish with the application? What is the problem that you have that you want to solve?**
The problem is that the beer gets outside of the ideal temperature and the quality suffers.

**Ideally, how would you like the application to work?**
They would like a dashboard type view showing the status of each of the containers, and have some sort of easy to see indication when a container falls outside that acceptable range. That dashboard application can then be displayed on a phone or tablet inside the truck.

**Would you like  any other kind of notifications? Email or SMS perhaps?**
As the business is expanding, they would. Although, for now the dashboard is fine as Shane is quite trustworthy.

**Does it need to be behind authentication?**
No, public is fine.

**Browser support?**
Shane only uses Chrome, so that is fine.

**How will the data be captured**
They will handle that, we don't need to worry about it. 
