import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';

type CommandCollection = Record<string, Command>;

/** CLI commands manager */
export class CliApplication {
  private commands: CommandCollection = {};

  constructor(private readonly defaultCommand: string = '--help') {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      const commandName = command.getName();

      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Command ${commandName} is already registered.`);
      }

      this.commands[commandName] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(
        `The default command (${this.defaultCommand}) is not registered.`,
      );
    }

    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName] ?? [];
    command.execute(...commandArgs);
  }
}
