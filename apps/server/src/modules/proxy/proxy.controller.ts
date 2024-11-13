// apps/server/src/modules/proxy/proxy.controller.ts
import { All, Controller, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('api/proxy/american-football')
export class ProxyController {
  @All('*')
  async proxyRequest(@Req() request: Request, @Res() response: Response) {
    const API_URL = 'https://v1.american-football.api-sports.io'

    try {
      const path = request.url.replace('/api/proxy/american-football', '')
      const queryString = request.url.includes('?')
        ? request.url.split('?')[1]
        : ''

      const proxyResponse = await fetch(
        `${API_URL}${path}${queryString ? '?' + queryString : ''}`,
        {
          method: request.method,
          headers: {
            'x-apisports-key': '6c3c11fe1af925ff889d220229ff3297',
            'x-rapidapi-host': 'v1.american-football.api-sports.io',
          },
        },
      )

      const data = await proxyResponse.json()
      return response.json(data)
    } catch (error) {
      console.error('Proxy Error:', error)
      return response.status(500).json({ error: 'Proxy Error' })
    }
  }
}
