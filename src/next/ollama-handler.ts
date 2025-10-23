import { OllamaClient, OllamaClientConfig, OllamaGenerateRequest, OllamaGenerateResponse } from '../ollama-client.js';

/**
 * Factory function to create an Ollama client for use in Next.js API routes.
 * Can be used in both traditional API routes and server actions.
 *
 * @param config - Ollama client configuration
 * @returns An OllamaClient instance
 *
 * @example
 * // In pages/api/chat.ts or app/api/chat/route.ts
 * import { createOllamaClient } from '@rmcquiston/ollama-api-component/next';
 *
 * const ollama = createOllamaClient({
 *   baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
 * });
 *
 * export async function POST(request: Request) {
 *   const { prompt } = await request.json();
 *   const response = await ollama.generate({ model: 'llama2', prompt });
 *   return Response.json(response);
 * }
 */
export function createOllamaClient(config: OllamaClientConfig): OllamaClient {
  return new OllamaClient(config);
}

/**
 * Helper for streaming Ollama responses in Next.js API routes.
 * Handles streaming generation and converting to SSE format.
 *
 * @param ollama - OllamaClient instance
 * @param request - Generation request
 * @param onChunk - Callback for each chunk received
 * @returns Promise that resolves when streaming completes
 */
export async function streamOllamaGeneration(
  ollama: OllamaClient,
  request: OllamaGenerateRequest,
  onChunk: (chunk: OllamaGenerateResponse) => void | Promise<void>
): Promise<void> {
  // Note: Full streaming support would require changes to OllamaClient
  // This is a placeholder for the streaming interface
  const response = await ollama.generate(request);
  onChunk(response);
}
