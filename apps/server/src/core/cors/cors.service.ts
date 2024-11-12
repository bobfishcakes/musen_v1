import { Injectable } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import {
  ConfigurationService,
  ConfigurationServiceObject,
} from '../configuration'

@Injectable()
export class CorsService {
  constructor(private configurationService: ConfigurationService) {}

  getOptions() {
    const options: Record<ConfigurationServiceObject.Environment, CorsOptions> =
      {
        [ConfigurationServiceObject.Environment.DEVELOPMENT]: {
          origin: (origin, callback) => {
            if (origin) {
              callback(null, origin)
            } else {
              callback(new Error('Not allowed by CORS'))
            }
          },
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          allowedHeaders: 'Content-Type, Accept, Authorization',
          credentials: true,
        },
        [ConfigurationServiceObject.Environment.PRODUCTION]: {
          origin: (origin, callback) => {
            if (origin) {
              callback(null, origin)
            } else {
              callback(new Error('Not allowed by CORS'))
            }
          },
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          allowedHeaders: 'Content-Type, Accept, Authorization',
          credentials: true,
        },
      }

    const environment = this.configurationService.getEnvironment()

    const value = options[environment]
    const valueDefault =
      options[ConfigurationServiceObject.Environment.DEVELOPMENT]

    return value ?? valueDefault
  }
}
