import { exec } from 'child_process'
import {Command} from '@oclif/command'
import {
  getBuildType,
  getPlatformType, PathBuilder,
} from "../lib/common";
import {archive} from "../features/archive";
import { cli } from 'cli-ux';

export default class Archive extends Command {
  static description = 'Archive your project'
  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    await this.pathBuilder.init()

    const platform: string = await getPlatformType()
    const buildType: string = await getBuildType()

    const command: string = archive(buildType, platform, this.pathBuilder)

    cli.action.start('archiving')
    exec(command, (err, stdout, stderr) => {
      if (err) {
        this.log(JSON.stringify(stderr))
        this.log(JSON.stringify(err))
        cli.action.stop('failed')
      } else {
        cli.action.stop()
      }
    });
  }
}

// "rename:client": "ren D:\\Builds\\Client\\WindowsNoEditor D:\\Builds\\Client\\Windows",
//   "rename:server": "ren D:\\Builds\\Server\\WindowsNoEditor D:\\Builds\\Server\\Windows",
//
//   "archive:client": "tar.exe -a -c -f D:\\Builds\\Client\\Windows.zip D:\\Builds\\Client",
//   "archive:server": "tar.exe -a -c -f D:\\Builds\\Server\\Windows.zip D:\\Builds\\Server",
//
//   "renameAndArchive:client": "npm run archive:client && npm run renameAndArchive:client",
//   "renameAndArchive:server": "npm run archive:server && npm run renameAndArchive:server",
