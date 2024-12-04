import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import {
  ConfigurationService,
  ConfigurationServiceObject,
} from '../configuration';

@Injectable()
export class CorsService {
  constructor(private configurationService: ConfigurationService) {}

  getOptions(): CorsOptions {
    const options: Record<string, CorsOptions> = {
      [ConfigurationServiceObject.Environment.DEVELOPMENT]: {
        origin: (origin, callback) => {
          // Allow requests from localhost:8099 and null origin (for same-origin requests)
          const allowedOrigins = ['http://localhost:8099', 'null'];
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
        credentials: true
      },
      [ConfigurationServiceObject.Environment.PRODUCTION]: {
        // Production CORS settings...
      }
    };
  
    const value = options[this.configurationService.getEnvironment()];
    return value ?? options[ConfigurationServiceObject.Environment.DEVELOPMENT];
  }
}
