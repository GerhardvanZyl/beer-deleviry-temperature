module.exports = class LoggingService {

    constructor() {
        this._loggers = [];
    }

    logInfo(message) {
        for (let logger of this._loggers) {
            logger.logInfo(message);
        }
    }

    logWarning(message) {
        for (let logger of this._loggers) {
            logger.logWarning(message);
        }
    }

    logError(message) {
        for (let logger of this._loggers) {
            logger.logError(message);
        }
    }

    /**
     * Registers a logger object to log errors/warnings/info. It The logger should have logInfo, logWarning and logError methods,
     * each taking 'message' as a parameter;
     * @param {Object} logger 
     */
    register(logger) {

        if (typeof logger.logInfo !== 'function') {
            throw 'Logger object needs a logInfo method that takes a message as its first parameter';
        }
        if (typeof logger.logWarning !== 'function') {
            throw 'Logger object needs a logWarning method that takes a message as its first parameter';
        }
        if (typeof logger.logError !== 'function') {
            throw 'Logger object needs a logError method that takes a message as its first parameter';
        }

        this._loggers.push(logger);
    }
};
