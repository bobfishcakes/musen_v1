// apps/server/src/modules/proxy/proxy.module.ts
import { Module } from '@nestjs/common'
import { ProxyController } from './proxy.controller'

@Module({
  controllers: [ProxyController],
})
export class ProxyModule {}
