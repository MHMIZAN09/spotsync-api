import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '../generated/prisma/client.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {



    constructor(private readonly configService: ConfigService) {
        const adapter = new PrismaPg({
            connectionString: configService.getOrThrow<string>('DATABASE_URL') ?? ''
        })
        super({
            adapter,
            log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
        })
    }

    async onModuleInit() {
        await this.$connect();
        console.log('Prisma connected to the database');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Prisma disconnected from the database');
    }

}
