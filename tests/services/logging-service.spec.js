const LoggingService = require('../../services/logging-service.js');

describe('Logging Service', () => {

    let logger;

    beforeEach(() => {
        logger = new LoggingService();
    });

    it('should initialize', () => {
        expect(logger).toBeDefined();
    });

    describe('register', () => {
        it('should register loggers without error if the logger has the required methods', () => {

            expect(() => {
                logger.register({
                    logInfo: () => { },
                    logWarning: () => { },
                    logError: () => { }
                });
            }).not.toThrow();

        });

        it('should throw an exception if any of the logInfo, logWarning or logError methods are missing from the logger', () => {
            expect(() => {
                logger.register({
                    logWarning: () => { },
                    logError: () => { }
                });
            }).toThrow();

            expect(() => {
                logger.register({
                    logInfo: () => { },
                    logError: () => { }
                });
            }).toThrow();

            expect(() => {
                logger.register({
                    logInfo: () => { },
                    logWarning: () => { }
                });
            }).toThrow();
        });
    });

    describe('logInfo', () => {
        it('should call the logInfo method on all the registered loggers', () => {

            let logger1Called = false;
            let logger2Called = false;

            logger.register({
                logInfo: () => { logger1Called = true; },
                logWarning: () => { },
                logError: () => { }
            });

            logger.register({
                logInfo: () => { logger2Called = true; },
                logWarning: () => { },
                logError: () => { }
            });

            logger.logInfo('Hello test');

            expect(logger1Called).toEqual(true);
            expect(logger2Called).toEqual(true);
        });

        it('should not throw an error if no logger has been registered', () => {
            expect(() => {
                logger.logInfo('hello test');
            }).not.toThrow();
        });
    });

    describe('logWarning', () => {
        it('should call the logWarning method on all the registered loggers', () => {

            let logger1Called = false;
            let logger2Called = false;

            logger.register({
                logInfo: () => { },
                logWarning: () => { logger1Called = true; },
                logError: () => { }
            });

            logger.register({
                logInfo: () => { },
                logWarning: () => { logger2Called = true; },
                logError: () => { }
            });

            logger.logWarning('Hello test');

            expect(logger1Called).toEqual(true);
            expect(logger2Called).toEqual(true);
        });

        it('should not throw an error if no logger has been registered', () => {
            expect(() => {
                logger.logInfo('hello test');
            }).not.toThrow();
        });
    });

    describe('logError', () => {
        it('should call the logError method on all the registered loggers', () => {

            let logger1Called = false;
            let logger2Called = false;

            logger.register({
                logInfo: () => { },
                logWarning: () => { },
                logError: () => { logger1Called = true; }
            });

            logger.register({
                logInfo: () => { },
                logWarning: () => { },
                logError: () => { logger2Called = true; }
            });

            logger.logError('Hello test');

            expect(logger1Called).toEqual(true);
            expect(logger2Called).toEqual(true);
        });

        it('should not throw an error if no logger has been registered', () => {
            expect(() => {
                logger.logInfo('hello test');
            }).not.toThrow();
        });
    });

});