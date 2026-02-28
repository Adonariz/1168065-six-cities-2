import { appendFile } from 'node:fs/promises';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';
import got from 'got';
import chalk from 'chalk';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(filepath, `${tsvOfferGenerator.generate()}\n`, {
        encoding: 'utf8',
      });
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...args: string[]): Promise<void> {
    const [count, filepath, url] = args;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(chalk.greenBright(`File ${filepath} was created`));
    } catch (error: unknown) {
      console.error(chalk.redBright('Failed to generate data'));

      if (error instanceof Error) {
        console.error(chalk.redBright(error.message));
      }
    }
  }
}
