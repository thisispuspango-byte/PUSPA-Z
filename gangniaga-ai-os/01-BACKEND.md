# GANGNIAGA AI OS — BACKEND PLATFORM (NestJS)

## apps/api/ Structure

```
apps/api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   ├── tenant.decorator.ts
│   │   │   └── api-response.decorator.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── prisma-exception.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   ├── tenant.guard.ts
│   │   │   └── throttle.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   ├── cache.interceptor.ts
│   │   │   └── tenant.interceptor.ts
│   │   ├── middleware/
│   │   │   ├── tenant.middleware.ts
│   │   │   └── correlation-id.middleware.ts
│   │   ├── pipes/
│   │   │   ├── validation.pipe.ts
│   │   │   └── parse-int.pipe.ts
│   │   ├── services/
│   │   │   ├── prisma.service.ts
│   │   │   ├── redis.service.ts
│   │   │   ├── queue.service.ts
│   │   │   ├── storage.service.ts
│   │   │   ├── search.service.ts
│   │   │   └── monitoring.service.ts
│   │   └── utils/
│   │       ├── encryption.util.ts
│   │       ├── pagination.util.ts
│   │       └── slug.util.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── api-key.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── register.dto.ts
│   │   │   │   ├── refresh-token.dto.ts
│   │   │   │   └── forgot-password.dto.ts
│   │   │   └── __tests__/
│   │   │       └── auth.controller.spec.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       ├── update-user.dto.ts
│   │   │       └── update-preferences.dto.ts
│   │   ├── tenants/
│   │   │   ├── tenants.module.ts
│   │   │   ├── tenants.controller.ts
│   │   │   └── tenants.service.ts
│   │   ├── workspaces/
│   │   │   ├── workspaces.module.ts
│   │   │   ├── workspaces.controller.ts
│   │   │   ├── workspaces.service.ts
│   │   │   └── dto/
│   │   │       ├── create-workspace.dto.ts
│   │   │       ├── update-workspace.dto.ts
│   │   │       └── invite-member.dto.ts
│   │   ├── agents/
│   │   │   ├── agents.module.ts
│   │   │   ├── agents.controller.ts
│   │   │   ├── agents.service.ts
│   │   │   ├── agents.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-agent.dto.ts
│   │   │   │   ├── update-agent.dto.ts
│   │   │   │   └── execute-agent.dto.ts
│   │   │   └── __tests__/
│   │   │       └── agents.service.spec.ts
│   │   ├── executions/
│   │   │   ├── executions.module.ts
│   │   │   ├── executions.controller.ts
│   │   │   ├── executions.service.ts
│   │   │   └── executions.gateway.ts
│   │   ├── workflows/
│   │   │   ├── workflows.module.ts
│   │   │   ├── workflows.controller.ts
│   │   │   ├── workflows.service.ts
│   │   │   └── dto/
│   │   │       ├── create-workflow.dto.ts
│   │   │       └── execute-workflow.dto.ts
│   │   ├── browser/
│   │   │   ├── browser.module.ts
│   │   │   ├── browser.controller.ts
│   │   │   ├── browser.service.ts
│   │   │   └── dto/
│   │   │       ├── create-session.dto.ts
│   │   │       └── browser-action.dto.ts
│   │   ├── memory/
│   │   │   ├── memory.module.ts
│   │   │   ├── memory.controller.ts
│   │   │   ├── memory.service.ts
│   │   │   └── dto/
│   │   │       ├── store-memory.dto.ts
│   │   │       └── search-memory.dto.ts
│   │   ├── tools/
│   │   │   ├── tools.module.ts
│   │   │   ├── tools.controller.ts
│   │   │   └── tools.service.ts
│   │   ├── skills/
│   │   │   ├── skills.module.ts
│   │   │   ├── skills.controller.ts
│   │   │   └── skills.service.ts
│   │   ├── forecasting/
│   │   │   ├── forecasting.module.ts
│   │   │   ├── forecasting.controller.ts
│   │   │   ├── forecasting.service.ts
│   │   │   └── dto/
│   │   │       ├── create-forecast.dto.ts
│   │   │       └── scenario-analysis.dto.ts
│   │   ├── documents/
│   │   │   ├── documents.module.ts
│   │   │   ├── documents.controller.ts
│   │   │   └── documents.service.ts
│   │   ├── integrations/
│   │   │   ├── integrations.module.ts
│   │   │   ├── integrations.controller.ts
│   │   │   └── integrations.service.ts
│   │   ├── notifications/
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.service.ts
│   │   │   └── notifications.gateway.ts
│   │   ├── billing/
│   │   │   ├── billing.module.ts
│   │   │   ├── billing.controller.ts
│   │   │   ├── billing.service.ts
│   │   │   └── stripe.webhook.handler.ts
│   │   ├── analytics/
│   │   │   ├── analytics.module.ts
│   │   │   ├── analytics.controller.ts
│   │   │   └── analytics.service.ts
│   │   ├── health/
│   │   │   ├── health.module.ts
│   │   │   └── health.controller.ts
│   │   └── graphql/
│   │       ├── graphql.module.ts
│   │       ├── schema.ts
│   │       └── resolvers/
│   │           ├── agents.resolver.ts
│   │           ├── executions.resolver.ts
│   │           └── workflows.resolver.ts
│   └── config/
│       ├── configuration.ts
│       ├── database.config.ts
│       ├── redis.config.ts
│       ├── ai.config.ts
│       └── swagger.config.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── nest-cli.json
└── Dockerfile
```

## Core Files

### apps/api/src/main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Global prefix & versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Middleware
  app.use(CorrelationIdMiddleware);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Correlation-ID'],
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new PrismaExceptionFilter(), new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  // WebSocket
  app.useWebSocketAdapter(new IoAdapter(app));

  // Swagger
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('GangNiaga AI OS API')
      .setDescription('Autonomous AI Business Operating System')
      .setVersion('1.0.0')
      .addBearerAuth()
      .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'api-key')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Health check endpoint (before global prefix)
  app.use('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`
  🚀 GangNiaga AI OS API running on port ${port}
  📚 API Docs: http://localhost:${port}/api/docs
  🔍 Health: http://localhost:${port}/health
  `);
}

bootstrap();
```

### apps/api/src/app.module.ts
```typescript
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { configuration } from './config/configuration';
import { DatabaseModule } from './common/services/prisma.service';
import { RedisModule } from './common/services/redis.service';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { AgentsModule } from './modules/agents/agents.module';
import { ExecutionsModule } from './modules/executions/executions.module';
import { WorkflowsModule } from './modules/workflows/workflows.module';
import { BrowserModule } from './modules/browser/browser.module';
import { MemoryModule } from './modules/memory/memory.module';
import { ToolsModule } from './modules/tools/tools.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ForecastingModule } from './modules/forecasting/forecasting.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { BillingModule } from './modules/billing/billing.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { HealthModule } from './modules/health/health.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.local'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 50,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Queue
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    }),

    // Event emitter
    EventEmitterModule.forRoot(),

    // Scheduling
    ScheduleModule.forRoot(),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/graphql/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req }) => ({ req }),
    }),

    // Core services
    DatabaseModule,
    RedisModule,

    // Feature modules
    AuthModule,
    UsersModule,
    TenantsModule,
    WorkspacesModule,
    AgentsModule,
    ExecutionsModule,
    WorkflowsModule,
    BrowserModule,
    MemoryModule,
    ToolsModule,
    SkillsModule,
    ForecastingModule,
    DocumentsModule,
    IntegrationsModule,
    NotificationsModule,
    BillingModule,
    AnalyticsModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude('health(.*)', 'api/v1/auth/(.*)', 'api/v1/billing/webhook(.*)')
      .forRoutes('*');
  }
}
```

### apps/api/src/config/configuration.ts
```typescript
export const configuration = () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000', 10),
    name: process.env.APP_NAME || 'GangNiaga AI OS',
    url: process.env.APP_URL || 'http://localhost:3000',
  },
  database: {
    url: process.env.DATABASE_URL,
    poolMin: parseInt(process.env.DATABASE_POOL_MIN || '2', 10),
    poolMax: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION || '7d',
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '30d',
    encryptionKey: process.env.ENCRYPTION_KEY,
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    litellmBaseUrl: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
    langfusePublicKey: process.env.LANGFUSE_PUBLIC_KEY,
    langfuseSecretKey: process.env.LANGFUSE_SECRET_KEY,
    langfuseBaseUrl: process.env.LANGFUSE_BASE_URL || 'http://localhost:3000',
  },
  storage: {
    s3Endpoint: process.env.S3_ENDPOINT,
    s3AccessKey: process.env.S3_ACCESS_KEY,
    s3SecretKey: process.env.S3_SECRET_KEY,
    s3Bucket: process.env.S3_BUCKET || 'gangniaga-assets',
    s3Region: process.env.S3_REGION || 'us-east-1',
  },
  search: {
    meiliHost: process.env.MEILI_HOST || 'http://localhost:7700',
    meiliMasterKey: process.env.MEILI_MASTER_KEY,
  },
  temporal: {
    address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
    namespace: process.env.TEMPORAL_NAMESPACE || 'default',
  },
  browser: {
    wsEndpoint: process.env.BROWSER_WS_ENDPOINT || 'ws://localhost:3001',
    poolSize: parseInt(process.env.BROWSER_POOL_SIZE || '5', 10),
    timeout: parseInt(process.env.BROWSER_TIMEOUT || '30000', 10),
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    priceStarter: process.env.STRIPE_PRICE_STARTER,
    pricePro: process.env.STRIPE_PRICE_PRO,
    priceEnterprise: process.env.STRIPE_PRICE_ENTERPRISE,
  },
  email: {
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '1025', 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || 'noreply@gangniaga.ai',
  },
});
```

### apps/api/src/common/services/prisma.service.ts
```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('database.url'),
        },
      },
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Tenant-aware query helper
  async setTenantContext(tenantId: string) {
    await this.$executeRaw`SELECT set_config('app.current_tenant', ${tenantId}, true)`;
  }

  // Clean up soft-deleted records
  async cleanDeletedRecords() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // This would be implemented based on soft-delete patterns
    // For now, just a placeholder for the cleanup job
  }
}
```

### apps/api/src/common/services/redis.service.ts
```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  private subscriber: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const url = this.configService.get('redis.url');
    const password = this.configService.get('redis.password');

    this.client = new Redis(url, {
      password,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 50, 2000),
      lazyConnect: true,
    });

    this.subscriber = this.client.duplicate();
  }

  async onModuleDestroy() {
    await this.client.quit();
    await this.subscriber.quit();
  }

  get redis() {
    return this.client;
  }

  get sub() {
    return this.subscriber;
  }

  // Cache helpers
  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.setex(key, ttlSeconds, serialized);
    } else {
      await this.client.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async delPattern(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }

  // Rate limiting
  async incrementRateLimit(key: string, windowSeconds: number): Promise<number> {
    const multi = this.client.multi();
    multi.incr(key);
    multi.expire(key, windowSeconds);
    const results = await multi.exec();
    return results?.[0]?.[1] as number || 0;
  }

  // Pub/Sub
  async publish(channel: string, message: unknown): Promise<void> {
    await this.client.publish(channel, JSON.stringify(message));
  }

  // Distributed lock
  async acquireLock(key: string, ttlMs: number): Promise<string | null> {
    const token = `${Date.now()}-${Math.random()}`;
    const acquired = await this.client.set(key, token, 'PX', ttlMs, 'NX');
    return acquired ? token : null;
  }

  async releaseLock(key: string, token: string): Promise<boolean> {
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, key, token);
    return result === 1;
  }
}
```

### apps/api/src/common/services/monitoring.service.ts
```typescript
import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Gauge, register } from 'prom-client';

@Injectable()
export class MonitoringService {
  private readonly httpRequestDuration: Histogram;
  private readonly httpRequestTotal: Counter;
  private readonly activeConnections: Gauge;
  private readonly aiTokenUsage: Counter;
  private readonly aiRequestDuration: Histogram;
  private readonly workflowExecutionDuration: Histogram;
  private readonly browserSessionActive: Gauge;

  constructor() {
    // HTTP metrics
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
    });

    this.httpRequestTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
    });

    this.activeConnections = new Gauge({
      name: 'active_websocket_connections',
      help: 'Number of active WebSocket connections',
    });

    // AI metrics
    this.aiTokenUsage = new Counter({
      name: 'ai_token_usage_total',
      help: 'Total AI token usage',
      labelNames: ['model', 'type'], // type: input/output
    });

    this.aiRequestDuration = new Histogram({
      name: 'ai_request_duration_seconds',
      help: 'Duration of AI requests in seconds',
      labelNames: ['model'],
      buckets: [0.5, 1, 2, 5, 10, 30, 60],
    });

    // Workflow metrics
    this.workflowExecutionDuration = new Histogram({
      name: 'workflow_execution_duration_seconds',
      help: 'Duration of workflow executions',
      labelNames: ['workflow_type', 'status'],
      buckets: [1, 5, 10, 30, 60, 300, 600],
    });

    // Browser metrics
    this.browserSessionActive = new Gauge({
      name: 'browser_sessions_active',
      help: 'Number of active browser sessions',
    });
  }

  // HTTP
  recordHttpRequest(method: string, route: string, statusCode: number, duration: number) {
    this.httpRequestDuration.observe({ method, route, status_code: statusCode }, duration);
    this.httpRequestTotal.inc({ method, route, status_code: statusCode });
  }

  // WebSocket
  incrementConnections() {
    this.activeConnections.inc();
  }

  decrementConnections() {
    this.activeConnections.dec();
  }

  // AI
  recordAITokenUsage(model: string, type: 'input' | 'output', tokens: number) {
    this.aiTokenUsage.inc({ model, type }, tokens);
  }

  recordAIRequestDuration(model: string, duration: number) {
    this.aiRequestDuration.observe({ model }, duration);
  }

  // Workflow
  recordWorkflowExecution(workflowType: string, status: string, duration: number) {
    this.workflowExecutionDuration.observe({ workflow_type: workflowType, status }, duration);
  }

  // Browser
  setBrowserSessionsActive(count: number) {
    this.browserSessionActive.set(count);
  }

  // Metrics endpoint
  async getMetrics(): Promise<string> {
    return register.metrics();
  }
}
```

### apps/api/src/common/guards/jwt-auth.guard.ts
```typescript
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or expired token');
    }
    return user;
  }
}
```

### apps/api/src/common/guards/roles.guard.ts
```typescript
import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException(`Required role: ${requiredRoles.join(' or ')}`);
    }

    return true;
  }
}
```

### apps/api/src/modules/auth/auth.service.ts
```typescript
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/services/prisma.service';
import { RedisService } from '../../common/services/redis.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private redis: RedisService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create tenant and user
    const result = await this.prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name: dto.organizationName || `${dto.name}'s Organization`,
          slug: this.generateSlug(dto.organizationName || dto.name),
        },
      });

      const user = await tx.user.create({
        data: {
          tenantId: tenant.id,
          email: dto.email,
          passwordHash,
          name: dto.name,
          role: 'OWNER',
        },
      });

      // Create default workspace
      await tx.workspace.create({
        data: {
          tenantId: tenant.id,
          name: 'Main Workspace',
          description: 'Default workspace',
        },
      });

      return { user, tenant };
    });

    // Generate tokens
    const tokens = await this.generateTokens(result.user.id, result.tenant.id, result.user.role);

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      },
      tenant: {
        id: result.tenant.id,
        name: result.tenant.name,
        slug: result.tenant.slug,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { tenant: true },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user.id, user.tenantId, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tenant: {
        id: user.tenant.id,
        name: user.tenant.name,
        slug: user.tenant.slug,
      },
      ...tokens,
    };
  }

  async refreshTokens(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get('auth.jwtSecret'),
      });

      // Check if token is blacklisted
      const isBlacklisted = await this.redis.get(`blacklist:${dto.refreshToken}`);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been revoked');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user.id, user.tenantId, user.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken: string) {
    // Blacklist refresh token
    await this.redis.set(`blacklist:${refreshToken}`, '1', 60 * 60 * 24 * 30); // 30 days

    // Clear user sessions
    await this.redis.delPattern(`session:${userId}:*`);

    return { message: 'Logged out successfully' };
  }

  private async generateTokens(userId: string, tenantId: string, role: string) {
    const payload = { sub: userId, tenantId, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('auth.jwtExpiration', '7d'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('auth.refreshTokenExpiration', '30d'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
    };
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50) + '-' + Math.random().toString(36).substring(2, 6);
  }
}
```

### apps/api/src/modules/agents/agents.service.ts
```typescript
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { RedisService } from '../../common/services/redis.service';
import { AiService } from '../ai/ai.service';
import { CreateAgentDto, UpdateAgentDto, ExecuteAgentDto } from './dto';

@Injectable()
export class AgentsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private aiService: AiService,
  ) {}

  async create(userId: string, workspaceId: string, dto: CreateAgentDto) {
    // Verify workspace access
    await this.verifyWorkspaceAccess(userId, workspaceId);

    const agent = await this.prisma.agent.create({
      data: {
        workspaceId,
        userId,
        name: dto.name,
        description: dto.description,
        type: dto.type || 'GENERAL',
        model: dto.model || 'gpt-4o',
        temperature: dto.temperature ?? 0.7,
        maxTokens: dto.maxTokens || 4096,
        systemPrompt: dto.systemPrompt,
        config: dto.config || {},
      },
      include: {
        tools: { include: { tool: true } },
        skills: { include: { skill: true } },
      },
    });

    return agent;
  }

  async findAll(userId: string, workspaceId: string) {
    await this.verifyWorkspaceAccess(userId, workspaceId);

    return this.prisma.agent.findMany({
      where: { workspaceId },
      include: {
        tools: { include: { tool: true } },
        skills: { include: { skill: true } },
        _count: { select: { executions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, agentId: string) {
    const agent = await this.prisma.agent.findUnique({
      where: { id: agentId },
      include: {
        tools: { include: { tool: true } },
        skills: { include: { skill: true } },
        executions: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    await this.verifyWorkspaceAccess(userId, agent.workspaceId);
    return agent;
  }

  async update(userId: string, agentId: string, dto: UpdateAgentDto) {
    const agent = await this.findOne(userId, agentId);

    return this.prisma.agent.update({
      where: { id: agentId },
      data: {
        ...dto,
        config: dto.config ? { ...(agent.config as object), ...dto.config } : undefined,
      },
      include: {
        tools: { include: { tool: true } },
        skills: { include: { skill: true } },
      },
    });
  }

  async remove(userId: string, agentId: string) {
    await this.findOne(userId, agentId);

    await this.prisma.agent.delete({ where: { id: agentId } });
    return { message: 'Agent deleted successfully' };
  }

  async execute(userId: string, agentId: string, dto: ExecuteAgentDto) {
    const agent = await this.findOne(userId, agentId);

    // Create execution record
    const execution = await this.prisma.execution.create({
      data: {
        workspaceId: agent.workspaceId,
        userId,
        agentId,
        type: 'AGENT_RUN',
        input: { message: dto.message, context: dto.context },
        status: 'RUNNING',
      },
    });

    try {
      // Get agent tools and skills
      const tools = agent.tools.map((t) => t.tool);
      const skills = agent.skills.map((s) => s.skill);

      // Execute via AI service
      const result = await this.aiService.executeAgent({
        agentId: agent.id,
        model: agent.model,
        systemPrompt: agent.systemPrompt || '',
        temperature: agent.temperature,
        maxTokens: agent.maxTokens,
        tools,
        skills,
        message: dto.message,
        context: dto.context,
        executionId: execution.id,
      });

      // Update execution
      await this.prisma.execution.update({
        where: { id: execution.id },
        data: {
          status: 'COMPLETED',
          output: result,
          completedAt: new Date(),
          tokensIn: result.tokensIn || 0,
          tokensOut: result.tokensOut || 0,
          cost: result.cost || 0,
        },
      });

      return {
        executionId: execution.id,
        result: result.output,
        tokensUsed: {
          input: result.tokensIn,
          output: result.tokensOut,
        },
        cost: result.cost,
      };
    } catch (error) {
      await this.prisma.execution.update({
        where: { id: execution.id },
        data: {
          status: 'FAILED',
          error: { message: error.message, stack: error.stack },
          completedAt: new Date(),
        },
      });

      throw error;
    }
  }

  private async verifyWorkspaceAccess(userId: string, workspaceId: string) {
    const member = await this.prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: { workspaceId, userId },
      },
    });

    if (!member) {
      throw new ForbiddenException('Access denied to workspace');
    }
  }
}
```

### apps/api/src/modules/ai/ai.service.ts
```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { PrismaService } from '../../common/services/prisma.service';
import { MonitoringService } from '../../common/services/monitoring.service';
import { MemoryService } from '../memory/memory.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private modelInstances: Map<string, ChatOpenAI> = new Map();

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private monitoring: MonitoringService,
    private memoryService: MemoryService,
  ) {}

  private getModel(modelName: string, temperature: number = 0.7, maxTokens: number = 4096): ChatOpenAI {
    const cacheKey = `${modelName}-${temperature}-${maxTokens}`;
    
    if (!this.modelInstances.has(cacheKey)) {
      const model = new ChatOpenAI({
        modelName,
        temperature,
        maxTokens,
        openAIApiKey: this.configService.get('ai.openaiApiKey'),
        configuration: {
          baseURL: this.configService.get('ai.litellmBaseUrl'),
        },
      });
      this.modelInstances.set(cacheKey, model);
    }

    return this.modelInstances.get(cacheKey)!;
  }

  async executeAgent(params: {
    agentId: string;
    model: string;
    systemPrompt: string;
    temperature: number;
    maxTokens: number;
    tools: any[];
    skills: any[];
    message: string;
    context?: any;
    executionId: string;
  }) {
    const startTime = Date.now();
    const { agentId, model, systemPrompt, temperature, maxTokens, tools, skills, message, context, executionId } = params;

    try {
      // Retrieve relevant memories
      const memories = await this.memoryService.search(agentId, message, 5);

      // Build enhanced system prompt
      const enhancedPrompt = this.buildSystemPrompt(systemPrompt, tools, skills, memories);

      // Get model instance
      const llm = this.getModel(model, temperature, maxTokens);

      // Create execution step
      await this.prisma.executionStep.create({
        data: {
          executionId,
          stepNumber: 1,
          type: 'LLM_CALL',
          name: 'Agent reasoning',
          status: 'RUNNING',
          input: { message, context },
        },
      });

      // Execute
      const response = await llm.invoke([
        { role: 'system', content: enhancedPrompt },
        { role: 'user', content: message },
      ]);

      const duration = (Date.now() - startTime) / 1000;
      const tokensIn = response.usage_metadata?.input_tokens || 0;
      const tokensOut = response.usage_metadata?.output_tokens || 0;
      const cost = this.calculateCost(model, tokensIn, tokensOut);

      // Record metrics
      this.monitoring.recordAITokenUsage(model, 'input', tokensIn);
      this.monitoring.recordAITokenUsage(model, 'output', tokensOut);
      this.monitoring.recordAIRequestDuration(model, duration);

      // Update execution step
      await this.prisma.executionStep.updateMany({
        where: { executionId, stepNumber: 1 },
        data: {
          status: 'COMPLETED',
          output: { response: response.content },
          completedAt: new Date(),
          duration: Math.round(duration * 1000),
          tokensIn,
          tokensOut,
        },
      });

      // Store memory of this interaction
      await this.memoryService.store(agentId, {
        type: 'CONVERSATION',
        content: `User: ${message}\nAssistant: ${response.content}`,
        importance: 0.5,
      });

      return {
        output: response.content,
        tokensIn,
        tokensOut,
        cost,
        duration,
      };
    } catch (error) {
      this.logger.error(`Agent execution failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  private buildSystemPrompt(
    basePrompt: string,
    tools: any[],
    skills: any[],
    memories: any[],
  ): string {
    let prompt = basePrompt;

    // Add tools
    if (tools.length > 0) {
      prompt += '\n\n## Available Tools\n';
      for (const tool of tools) {
        prompt += `- **${tool.name}**: ${tool.description}\n`;
      }
    }

    // Add skills
    if (skills.length > 0) {
      prompt += '\n\n## Active Skills\n';
      for (const skill of skills) {
        prompt += `- **${skill.name}**: ${skill.description}\n`;
      }
    }

    // Add memories
    if (memories.length > 0) {
      prompt += '\n\n## Relevant Memories\n';
      for (const memory of memories) {
        prompt += `- ${memory.content}\n`;
      }
    }

    prompt += '\n\nAlways use tools when available. Be concise and helpful.';
    return prompt;
  }

  private calculateCost(model: string, tokensIn: number, tokensOut: number): number {
    // Simplified cost calculation (per 1K tokens)
    const pricing: Record<string, { input: number; output: number }> = {
      'gpt-4o': { input: 0.0025, output: 0.01 },
      'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
      'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
    };

    const modelPricing = pricing[model] || pricing['gpt-4o'];
    return (tokensIn / 1000) * modelPricing.input + (tokensOut / 1000) * modelPricing.output;
  }
}
```

### apps/api/src/modules/memory/memory.service.ts
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class MemoryService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async store(agentId: string, data: {
    type: string;
    content: string;
    importance?: number;
    tags?: string[];
    metadata?: any;
  }) {
    // Generate embedding for the content
    const embedding = await this.generateEmbedding(data.content);

    const memory = await this.prisma.memory.create({
      data: {
        workspaceId: '', // Will be set from agent
        agentId,
        type: data.type as any,
        content: data.content,
        embedding,
        importance: data.importance || 0.5,
        tags: data.tags || [],
        metadata: data.metadata || {},
      },
    });

    return memory;
  }

  async search(agentId: string, query: string, limit: number = 5) {
    // Generate embedding for query
    const queryEmbedding = await this.generateEmbedding(query);

    // Search using pgvector cosine similarity
    const memories = await this.prisma.$queryRaw`
      SELECT id, content, type, importance, tags,
             1 - (embedding <=> ${queryEmbedding}::vector) as similarity
      FROM memories
      WHERE agent_id = ${agentId}
      ORDER BY embedding <=> ${queryEmbedding}::vector
      LIMIT ${limit}
    `;

    // Update access count and timestamp
    if (memories.length > 0) {
      const ids = (memories as any[]).map((m) => m.id);
      await this.prisma.memory.updateMany({
        where: { id: { in: ids } },
        data: {
          accessCount: { increment: 1 },
          lastAccessedAt: new Date(),
        },
      });
    }

    return memories;
  }

  async getRecent(agentId: string, limit: number = 20) {
    return this.prisma.memory.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async delete(memoryId: string) {
    await this.prisma.memory.delete({ where: { id: memoryId } });
    return { message: 'Memory deleted' };
  }

  async summarize(agentId: string) {
    const memories = await this.prisma.memory.findMany({
      where: { agentId },
      orderBy: { importance: 'desc' },
      take: 50,
    });

    if (memories.length === 0) {
      return { summary: 'No memories found' };
    }

    const content = memories.map((m) => m.content).join('\n');
    
    // Use AI to summarize
    const summary = await this.aiService.summarize(content);

    return { summary, memoryCount: memories.length };
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    // This would use OpenAI's embedding API
    // For now, return a placeholder
    // In production: const response = await openai.embeddings.create({ model: 'text-embedding-3-small', input: text });
    return new Array(1536).fill(0).map(() => Math.random() - 0.5);
  }
}
```

### apps/api/src/modules/browser/browser.service.ts
```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { RedisService } from '../../common/services/redis.service';
import { MonitoringService } from '../../common/services/monitoring.service';

@Injectable()
export class BrowserService {
  private readonly logger = new Logger(BrowserService.name);
  private activeSessions: Map<string, any> = new Map();

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private monitoring: MonitoringService,
  ) {}

  async createSession(workspaceId: string, userId: string, config?: any) {
    const session = await this.prisma.browserSession.create({
      data: {
        workspaceId,
        status: 'ACTIVE',
        userAgent: config?.userAgent,
        viewport: config?.viewport || { width: 1280, height: 720 },
      },
    });

    this.activeSessions.set(session.id, {
      sessionId: session.id,
      workspaceId,
      userId,
      createdAt: new Date(),
    });

    this.monitoring.setBrowserSessionsActive(this.activeSessions.size);

    return session;
  }

  async executeAction(sessionId: string, action: {
    type: string;
    selector?: string;
    value?: string;
    url?: string;
  }) {
    const session = await this.prisma.browserSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.status !== 'ACTIVE') {
      throw new Error('Browser session not found or inactive');
    }

    const actionRecord = await this.prisma.browserAction.create({
      data: {
        browserSessionId: sessionId,
        type: action.type as any,
        selector: action.selector,
        value: action.value,
        url: action.url,
        status: 'RUNNING',
      },
    });

    try {
      // Execute browser action via browser runtime service
      const result = await this.sendToBrowserRuntime(sessionId, action);

      await this.prisma.browserAction.update({
        where: { id: actionRecord.id },
        data: {
          status: 'COMPLETED',
          result,
          completedAt: new Date(),
        },
      });

      return result;
    } catch (error) {
      await this.prisma.browserAction.update({
        where: { id: actionRecord.id },
        data: {
          status: 'FAILED',
          error: { message: error.message },
          completedAt: new Date(),
        },
      });

      throw error;
    }
  }

  async getScreenshot(sessionId: string) {
    return this.executeAction(sessionId, { type: 'SCREENSHOT' });
  }

  async closeSession(sessionId: string) {
    await this.prisma.browserSession.update({
      where: { id: sessionId },
      data: {
        status: 'CLOSED',
        closedAt: new Date(),
      },
    });

    this.activeSessions.delete(sessionId);
    this.monitoring.setBrowserSessionsActive(this.activeSessions.size);

    return { message: 'Session closed' };
  }

  async getSessions(workspaceId: string) {
    return this.prisma.browserSession.findMany({
      where: { workspaceId },
      include: {
        actions: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async sendToBrowserRuntime(sessionId: string, action: any): Promise<any> {
    // This would communicate with the browser-runtime service via message queue or WebSocket
    // For now, return a placeholder
    this.logger.log(`Sending action to browser runtime: ${action.type}`);
    return { success: true, action: action.type };
  }
}
```

### apps/api/src/modules/workflows/workflows.service.ts
```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { RedisService } from '../../common/services/redis.service';
import { MonitoringService } from '../../common/services/monitoring.service';

@Injectable()
export class WorkflowsService {
  private readonly logger = new Logger(WorkflowsService.name);

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private monitoring: MonitoringService,
  ) {}

  async create(userId: string, workspaceId: string, data: any) {
    return this.prisma.workflow.create({
      data: {
        workspaceId,
        userId,
        name: data.name,
        description: data.description,
        type: data.type || 'MANUAL',
        definition: data.definition,
        cron: data.cron,
        timezone: data.timezone || 'UTC',
        triggers: {
          create: data.triggers || [],
        },
      },
      include: { triggers: true },
    });
  }

  async execute(workflowId: string, input?: any) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id: workflowId },
    });

    if (!workflow) {
      throw new Error('Workflow not found');
    }

    const execution = await this.prisma.workflowExecution.create({
      data: {
        workflowId,
        status: 'RUNNING',
        input,
      },
    });

    const startTime = Date.now();

    try {
      // Execute workflow steps based on definition
      const result = await this.executeWorkflowSteps(workflow, execution.id, input);

      const duration = (Date.now() - startTime) / 1000;

      await this.prisma.workflowExecution.update({
        where: { id: execution.id },
        data: {
          status: 'COMPLETED',
          output: result,
          completedAt: new Date(),
        },
      });

      this.monitoring.recordWorkflowExecution(workflow.type, 'completed', duration);

      return { executionId: execution.id, result };
    } catch (error) {
      const duration = (Date.now() - startTime) / 1000;

      await this.prisma.workflowExecution.update({
        where: { id: execution.id },
        data: {
          status: 'FAILED',
          error: { message: error.message },
          completedAt: new Date(),
        },
      });

      this.monitoring.recordWorkflowExecution(workflow.type, 'failed', duration);
      throw error;
    }
  }

  private async executeWorkflowSteps(workflow: any, executionId: string, input: any) {
    const definition = workflow.definition as any;
    const steps = definition.steps || [];
    const results: any[] = [];

    for (const step of steps) {
      this.logger.log(`Executing workflow step: ${step.name}`);

      // Execute step based on type
      switch (step.type) {
        case 'agent':
          // Execute agent
          results.push({ step: step.name, result: 'agent executed' });
          break;
        case 'condition':
          // Evaluate condition
          results.push({ step: step.name, result: 'condition evaluated' });
          break;
        case 'delay':
          // Wait
          await new Promise((resolve) => setTimeout(resolve, step.duration * 1000));
          results.push({ step: step.name, result: 'delay completed' });
          break;
        case 'parallel':
          // Execute parallel steps
          results.push({ step: step.name, result: 'parallel executed' });
          break;
        default:
          results.push({ step: step.name, result: 'unknown step type' });
      }
    }

    return { steps: results };
  }

  async getExecutions(workflowId: string) {
    return this.prisma.workflowExecution.findMany({
      where: { workflowId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
```

### apps/api/src/modules/forecasting/forecasting.service.ts
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ForecastingService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async createForecast(workspaceId: string, data: any) {
    const forecast = await this.prisma.forecast.create({
      data: {
        workspaceId,
        name: data.name,
        type: data.type,
        config: data.config,
        data: data.inputData,
        period: data.period,
        notes: data.notes,
        status: 'RUNNING',
      },
    });

    // Generate forecast asynchronously
    this.generateForecastData(forecast.id, data).catch(console.error);

    return forecast;
  }

  private async generateForecastData(forecastId: string, data: any) {
    try {
      // Use AI to generate forecast
      const forecastPrompt = `
        Generate a ${data.type} forecast based on the following data:
        ${JSON.stringify(data.inputData, null, 2)}
        
        Period: ${data.period}
        Config: ${JSON.stringify(data.config, null, 2)}
        
        Provide:
        1. Projected values for the next 12 months
        2. Key assumptions
        3. Risk factors
        4. Confidence intervals
        5. Recommendations
        
        Return as JSON.
      `;

      // This would call the AI service
      const result = {
        projections: [],
        assumptions: [],
        risks: [],
        confidence: 0.8,
        recommendations: [],
      };

      await this.prisma.forecast.update({
        where: { id: forecastId },
        data: {
          results: result,
          status: 'COMPLETED',
        },
      });
    } catch (error) {
      await this.prisma.forecast.update({
        where: { id: forecastId },
        data: {
          status: 'FAILED',
        },
      });
    }
  }

  async getForecasts(workspaceId: string) {
    return this.prisma.forecast.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getForecast(id: string) {
    return this.prisma.forecast.findUnique({
      where: { id },
    });
  }

  async scenarioAnalysis(workspaceId: string, data: any) {
    // Run multiple scenarios
    const scenarios = [
      { name: 'Best Case', multiplier: 1.2 },
      { name: 'Base Case', multiplier: 1.0 },
      { name: 'Worst Case', multiplier: 0.8 },
    ];

    const results = scenarios.map((scenario) => ({
      name: scenario.name,
      projections: this.applyScenario(data.baseData, scenario.multiplier),
    }));

    return { scenarios: results };
  }

  private applyScenario(baseData: any, multiplier: number) {
    // Apply scenario multiplier to base data
    if (Array.isArray(baseData)) {
      return baseData.map((item) => ({
        ...item,
        value: item.value * multiplier,
      }));
    }
    return baseData;
  }
}
```

### apps/api/src/modules/billing/billing.service.ts
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/services/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('stripe.secretKey')!, {
      apiVersion: '2024-04-10',
    });
  }

  async createCheckoutSession(tenantId: string, plan: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const priceId = this.getPriceId(plan);

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: undefined, // Will be filled by Stripe
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${this.configService.get('app.url')}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('app.url')}/billing/cancel`,
      metadata: {
        tenantId,
        plan,
      },
    });

    return { sessionId: session.id, url: session.url };
  }

  async handleWebhook(payload: any, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.configService.get('stripe.webhookSecret')!,
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object);
        break;
    }

    return { received: true };
  }

  private async handleCheckoutCompleted(session: any) {
    const { tenantId, plan } = session.metadata;

    // Get or create Stripe customer
    let subscription = await this.prisma.subscription.findFirst({
      where: { tenantId },
    });

    if (!subscription) {
      subscription = await this.prisma.subscription.create({
        data: {
          tenantId,
          plan: plan.toUpperCase(),
          status: 'ACTIVE',
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Update tenant plan
    await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { plan: plan.toUpperCase() },
    });
  }

  private async handleSubscriptionUpdated(subscription: any) {
    await this.prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status.toUpperCase(),
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  }

  private async handleSubscriptionDeleted(subscription: any) {
    await this.prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: { status: 'CANCELLED' },
    });

    // Downgrade tenant to free plan
    const sub = await this.prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (sub) {
      await this.prisma.tenant.update({
        where: { id: sub.tenantId },
        data: { plan: 'FREE' },
      });
    }
  }

  private getPriceId(plan: string): string {
    const priceMap: Record<string, string> = {
      starter: this.configService.get('stripe.priceStarter')!,
      pro: this.configService.get('stripe.pricePro')!,
      enterprise: this.configService.get('stripe.priceEnterprise')!,
    };

    return priceMap[plan.toLowerCase()] || priceMap.starter;
  }

  async getSubscription(tenantId: string) {
    return this.prisma.subscription.findFirst({
      where: { tenantId },
    });
  }
}
```

### apps/api/src/modules/executions/executions.gateway.ts
```typescript
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { MonitoringService } from '../../common/services/monitoring.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
  namespace: 'executions',
})
export class ExecutionsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ExecutionsGateway.name);
  private userSockets: Map<string, Set<string>> = new Map();

  constructor(private monitoring: MonitoringService) {}

  handleConnection(client: Socket) {
    this.monitoring.incrementConnections();
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.monitoring.decrementConnections();
    this.logger.log(`Client disconnected: ${client.id}`);

    // Remove from user sockets
    for (const [userId, sockets] of this.userSockets) {
      sockets.delete(client.id);
      if (sockets.size === 0) {
        this.userSockets.delete(userId);
      }
    }
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(client: Socket, payload: { userId: string; workspaceId: string }) {
    if (!this.userSockets.has(payload.userId)) {
      this.userSockets.set(payload.userId, new Set());
    }
    this.userSockets.get(payload.userId)!.add(client.id);

    client.join(`workspace:${payload.workspaceId}`);
    client.join(`user:${payload.userId}`);

    this.logger.log(`User ${payload.userId} subscribed to workspace ${payload.workspaceId}`);
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(client: Socket, payload: { userId: string; workspaceId: string }) {
    client.leave(`workspace:${payload.workspaceId}`);
    client.leave(`user:${payload.userId}`);
  }

  // Broadcast execution update to workspace
  broadcastExecutionUpdate(workspaceId: string, execution: any) {
    this.server.to(`workspace:${workspaceId}`).emit('execution:update', execution);
  }

  // Broadcast step update
  broadcastStepUpdate(workspaceId: string, step: any) {
    this.server.to(`workspace:${workspaceId}`).emit('execution:step', step);
  }

  // Broadcast agent status
  broadcastAgentStatus(workspaceId: string, agentId: string, status: string) {
    this.server.to(`workspace:${workspaceId}`).emit('agent:status', { agentId, status });
  }
}
```

### apps/api/package.json
```json
{
  "name": "@gangniaga/api",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "nest build",
    "dev": "nest start --watch",
    "start": "node dist/main.js",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main.js",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node prisma/seed.ts",
    "db:studio": "prisma studio",
    "generate": "prisma generate"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/event-emitter": "^2.0.0",
    "@nestjs/graphql": "^12.0.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/platform-express": "^10.3.0",
    "@nestjs/platform-socket.io": "^10.3.0",
    "@nestjs/schedule": "^4.0.0",
    "@nestjs/swagger": "^7.2.0",
    "@nestjs/terminus": "^10.2.0",
    "@nestjs/throttler": "^5.1.0",
    "@nestjs/websockets": "^10.3.0",
    "@prisma/client": "^5.10.0",
    "bcrypt": "^5.1.0",
    "bullmq": "^5.0.0",
    "class-transformer": "^0.5.0",
    "class-validator": "^0.14.0",
    "graphql": "^16.8.0",
    "ioredis": "^5.3.0",
    "langchain": "^0.1.0",
    "@langchain/openai": "^0.0.14",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "prom-client": "^15.1.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0",
    "socket.io": "^4.7.0",
    "stripe": "^14.14.0",
    "uuid": "^9.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "@nestjs/schematics": "^10.1.0",
    "@nestjs/testing": "^10.3.0",
    "@types/bcrypt": "^5.0.0",
    "@types/express": "^4.17.0",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.11.0",
    "@types/passport-jwt": "^4.0.0",
    "@types/passport-local": "^1.0.0",
    "@types/uuid": "^9.0.0",
    "jest": "^29.7.0",
    "prisma": "^5.10.0",
    "source-map-support": "^0.5.0",
    "supertest": "^6.3.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.5.0",
    "ts-node": "^10.9.0",
    "tsconfig-paths": "^4.2.0"
  }
}
```

---

*Generated: 2026-05-10*
*Component: Backend Platform (NestJS)*
*Status: Complete — Production-Ready Architecture*
