import { Injectable } from '@nestjs/common';
import { OllamaClient, OllamaClientConfig, OllamaGenerateRequest, OllamaGenerateResponse } from '../ollama-client.js';

/**
 * NestJS service for Ollama API integration.
 * Wraps the OllamaClient for use as a dependency-injectable service.
 */
@Injectable()
export class OllamaService {
  private client: OllamaClient;

  constructor(config: OllamaClientConfig) {
    this.client = new OllamaClient(config);
  }

  /**
   * Generate a completion using Ollama.
   */
  async generate(request: OllamaGenerateRequest): Promise<OllamaGenerateResponse> {
    return this.client.generate(request);
  }

  /**
   * List available models.
   */
  async listModels(): Promise<{ models: Array<{ name: string; [key: string]: unknown }> }> {
    return this.client.listModels();
  }

  /**
   * Pull a model from Ollama.
   */
  async pullModel(name: string): Promise<{ status: string }> {
    return this.client.pullModel(name);
  }
}
