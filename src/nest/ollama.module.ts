import { Module, DynamicModule } from '@nestjs/common';
import { OllamaService } from './ollama.service.js';
import { OllamaClientConfig } from '../ollama-client.js';

/**
 * NestJS module for Ollama API integration.
 * Provides OllamaService for dependency injection.
 *
 * @example
 * // Import in your app module
 * import { OllamaModule } from '@rmcquiston/ollama-api-component/nest';
 *
 * @Module({
 *   imports: [
 *     OllamaModule.register({
 *       baseUrl: 'http://localhost:11434',
 *     }),
 *   ],
 * })
 * export class AppModule {}
 */
@Module({})
export class OllamaModule {
  static register(config: OllamaClientConfig): DynamicModule {
    return {
      module: OllamaModule,
      providers: [
        {
          provide: OllamaService,
          useValue: new OllamaService(config),
        },
      ],
      exports: [OllamaService],
    };
  }
}
