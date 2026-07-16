import winston from 'winston';

/**
 * Central logger. Use this instead of console.log everywhere.
 * - In development: pretty colored console output
 * - In production: JSON logs (easy to ship to services like Datadog/CloudWatch)
 */
const isProd = process.env.NODE_ENV === 'production';

const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: isProd
    ? winston.format.combine(winston.format.timestamp(), winston.format.json())
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`)
      ),
  transports: [new winston.transports.Console()],
});

export default logger;
