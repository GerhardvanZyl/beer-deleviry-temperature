module.exports = class ConsoleLogger {
    constructor() { }

    logInfo(message) {
        console.log('Info: ' + message);
    }

    logError(message) {
        console.trace('Error: ' + message);
    }

    logWarning(message) {
        console.trace('Warning: ' + message);
    }
};