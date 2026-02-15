type ParsedCommand = Record<string, string[]>;

export class CommandParser {
  static parse(cliArgs: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    for (const arg of cliArgs) {
      // set the flag if an argument is a command
      if (arg.startsWith('--')) {
        parsedCommand[arg] = [];
        currentCommand = arg;
      } else if (currentCommand && arg) {
        // add arguments to the current command
        parsedCommand[currentCommand].push(arg);
      }
    }

    return parsedCommand;
  }
}
