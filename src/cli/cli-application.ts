import { Command } from './commands/command.interface.js';

type CommandCollection = Record<string, Command>;

/** CLI commands manager */
export class CliApplication {
  private commands: CommandCollection = {};

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      const commandName = command.getName();

      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Command ${commandName} is already registered.`);
      }

      this.commands[commandName] = command;
    });
  }
}
