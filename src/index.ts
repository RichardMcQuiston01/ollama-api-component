/**
 * Ollama API Component
 *
 * A reusable TypeScript component for making Ollama API requests.
 * Easily integrated into NestJS or Next.js API projects.
 *
 * @example
 * // Direct usage (uses default URL: http://localhost:11434/api)
 * import { OllamaClient } from '@rmcquiston/ollama-api-component';
 *
 * const ollama = new OllamaClient();
 * const response = await ollama.generate({ model: 'llama2', prompt: 'Hello' });
 *
 * @example
 * // Direct usage with custom URL
 * import { OllamaClient } from '@rmcquiston/ollama-api-component';
 *
 * const ollama = new OllamaClient({ baseUrl: 'https://ollama.example.com/api' });
 * const response = await ollama.generate({ model: 'llama2', prompt: 'Hello' });
 *
 * @example
 * // NestJS integration
 * import { OllamaModule } from '@rmcquiston/ollama-api-component/nest';
 *
 * @Module({
 *   imports: [OllamaModule.register({ baseUrl: 'https://ollama.example.com/api' })],
 * })
 * export class AppModule {}
 *
 * @example
 * // Next.js integration
 * import { createOllamaClient } from '@rmcquiston/ollama-api-component/next';
 *
 * const ollama = createOllamaClient({ baseUrl: process.env.OLLAMA_BASE_URL });
 * const response = await ollama.generate({ model: 'llama2', prompt: 'Hello' });
 */

export { OllamaClient } from './ollama-client.js';
export type {
  OllamaClientConfig,
  OllamaGenerateRequest,
  OllamaGenerateResponse,
} from './ollama-client.js';
