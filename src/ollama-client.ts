/**
 * Core Ollama API client for making requests to the Ollama API.
 * Handles HTTP communication, error handling, and response parsing.
 *
 * @see https://docs.ollama.com/api
 */

export interface OllamaClientConfig {
  /**
   * Base URL of the Ollama API.
   * Defaults to "http://localhost:11434/api"
   * @example "http://localhost:11434/api"
   * @example "https://ollama.example.com/api"
   */
  baseUrl?: string;
  /**
   * Request timeout in milliseconds.
   * Defaults to 30000 (30 seconds)
   */
  timeout?: number;
}

export interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  [key: string]: unknown;
}

export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export class OllamaClient {
  private baseUrl: string;
  private timeout: number;

  constructor(config: OllamaClientConfig = {}) {
    this.baseUrl = (config.baseUrl ?? 'http://localhost:11434/api').replace(/\/$/, '');
    this.timeout = config.timeout ?? 30000;
  }

  /**
   * Generate a completion using Ollama.
   * @param request - The generation request
   * @returns The generation response
   */
  async generate(request: OllamaGenerateRequest): Promise<OllamaGenerateResponse> {
    const response = await this.request<OllamaGenerateResponse>('/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    return response;
  }

  /**
   * List available models.
   * @returns List of available models
   */
  async listModels(): Promise<{ models: Array<{ name: string; [key: string]: unknown }> }> {
    return this.request('/tags', { method: 'GET' });
  }

  /**
   * Pull a model from Ollama.
   * @param name - The model name
   * @returns Pull response
   */
  async pullModel(name: string): Promise<{ status: string }> {
    return this.request('/pull', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  /**
   * Make a raw request to the Ollama API.
   * @param path - The API path
   * @param init - Fetch options
   * @returns The parsed response
   */
  private async request<T>(
    path: string,
    init: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Ollama API request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }
}
