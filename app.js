const express = require('express');
const app = express();
const port = 3000;

// Services
const LoggingService = require('./services/logging-service');
const RouteService = require('./services/route-service');
const MonitoringService = require('./services/monitoring-service');
const ConfigurationService = require('./services/mock-configuration-service');

// Providers
const ConsoleLoggingProvider = require('./providers/logging-providers/mock-console-logger');
const DbLoggingProvider = require('./providers/logging-providers/mock-db-logger');
const BeerDataProvider = require('./providers/mock-beer-data-provider');
const TruckDataProvider = require('./providers/mock-truck-data-provider');
const TemperatureDataProvider = require('./providers/temperature-data-provider');
const WebNotificationProvider = require('./providers/notification-providers/web-notification-provider');
const EmailNotificationProvider = require('./providers/notification-providers/mock-email-provider');

// Controllers
const TruckController = require('./controllers/truck-controller');

// Initialise services, providers and controllers
const logger = new LoggingService();
logger.register(new ConsoleLoggingProvider());
logger.register(new DbLoggingProvider());

const configService = new ConfigurationService(logger);
const truckDataProvider = new TruckDataProvider(logger);
const beerDataProvider = new BeerDataProvider(logger);
const temperatureDataProvider = new TemperatureDataProvider(logger, configService);

const webNotificationProvider = new WebNotificationProvider(logger);
const emailNotificationProvider = new EmailNotificationProvider(logger, configService);

const monitoringService = new MonitoringService(logger, configService, truckDataProvider, beerDataProvider, temperatureDataProvider);
monitoringService.register(webNotificationProvider);
monitoringService.register(emailNotificationProvider);
monitoringService.start();

let truckController = new TruckController(logger, webNotificationProvider, beerDataProvider, truckDataProvider, temperatureDataProvider);

new RouteService(app, logger, truckController).initializeRoutes();

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});

