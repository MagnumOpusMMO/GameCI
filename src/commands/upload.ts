import { exec } from 'child_process'
import {Command} from '@oclif/command'
import {
  getBuildType,
  getPlatformType, PathBuilder,
} from "../lib/common";
import {upload} from "../features/upload";
import { cli } from 'cli-ux';

export default class Upload extends Command {
  static description = 'Upload your project'
  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    await this.pathBuilder.init()

    const buildType: string = await getBuildType()
    const platform: string = await getPlatformType()

    const command: string = upload(buildType, platform, this.pathBuilder)

    cli.action.start('deploying')
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

// "upload:server": "aws s3 cp D:\\Builds\\Server.tar.gz s3://server.magnumopus.gg/Windows.tar.gz",
//   "upload:client": "aws s3 cp D:\\Builds\\Server.tar.gz s3://client.magnumopus.gg/Windows.tar.gz"
