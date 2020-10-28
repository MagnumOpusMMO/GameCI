import { exec } from 'child_process'
import {Command} from '@oclif/command'
import {
  getPlatformType, PathBuilder,
} from "../lib/common";
import {unarchive} from "../features/unarchive";

export default class Unarchive extends Command {
  static description = 'Unarchive your project'
  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    await this.pathBuilder.init()

    const platform: string = await getPlatformType()

    const command: string = unarchive(platform, this.pathBuilder)
	console.log(command)

    exec(command, (err, stdout, stderr) => {
	  console.log(stderr)
      if (err) {
        this.log(JSON.stringify(err))
      } else {
        this.log('UNARCHIVED')
      }
    });
  }
}
