enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private static instance: Logger;
  private currentLevels: Set<LogLevel>;
  private levelEmojis: { [key in LogLevel]: string } = {
    [LogLevel.DEBUG]: '🐛',
    [LogLevel.INFO]: 'ℹ️',
    [LogLevel.WARN]: '⚠️',
    [LogLevel.ERROR]: '❌',
  };

  private constructor(
    levels: LogLevel[] = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR],
  ) {
    this.currentLevels = new Set(levels);
  }

  public static getInstance(levels?: LogLevel[]): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(levels);
    } else if (levels !== undefined) {
      Logger.instance.setLevels(levels);
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string) {
    if (this.currentLevels.has(level)) {
      const emoji = this.levelEmojis[level];
      console.log(`[${new Date().toISOString()}] [${level}] ${emoji} ${message}`);
    }
  }

  public debug(message: string) {
    this.log(LogLevel.DEBUG, message);
  }

  public info(message: string) {
    this.log(LogLevel.INFO, message);
  }

  public warn(message: string) {
    this.log(LogLevel.WARN, message);
  }

  public error(message: string) {
    this.log(LogLevel.ERROR, message);
  }

  public setLevels(levels: LogLevel[]) {
    this.currentLevels = new Set(levels);
  }

  public addLevel(level: LogLevel) {
    this.currentLevels.add(level);
  }

  public removeLevel(level: LogLevel) {
    this.currentLevels.delete(level);
  }
}

const logger = Logger.getInstance();

export { Logger, LogLevel, logger };
