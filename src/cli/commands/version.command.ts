import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';

type PackageJSONConfig = {
  version: string;
};

/** check if value is a valid PackageJSONConfig */
function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

/** --version command */
export class VersionCommand implements Command {
  constructor(private readonly filePath: string = './package.json') {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedConfig: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedConfig)) {
      throw new Error('Failed to parse json content');
    }

    return importedConfig.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._args: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
