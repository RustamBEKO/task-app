import { ConfigService } from "@nestjs/config";

export const isDev= (ConfigService: ConfigService) => ConfigService.getOrThrow<string>('NODE_ENV') === 'development';