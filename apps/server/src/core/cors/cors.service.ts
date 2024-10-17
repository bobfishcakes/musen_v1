import { Injectable } from '@nestjs/common'
import {
  ConfigurationService,
  ConfigurationServiceObject,
} from '../configuration'

@Injectable()
export class CorsService {
  constructor(private configurationService: ConfigurationService) {}

  getOptions() {
    const clientBaseUrl = this.configurationService.getClientBaseUrl()
    const environment = this.configurationService.getEnvironment()

    const options = {
      origin:
        environment === ConfigurationServiceObject.Environment.PRODUCTION
          ? clientBaseUrl
          : [clientBaseUrl],
      credentials: true,
    }

    console.log('CORS options:', options)
    return options
  }
}
