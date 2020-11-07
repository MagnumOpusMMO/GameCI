import { exec } from 'child_process'
import {Command} from '@oclif/command'
import {
  getEnvironmentType,
  getPlatformType, PathBuilder,
} from "../lib/common";
import {cleanup} from "../features/cleanup";

export default class Cleanup extends Command {
  static description = 'Clean up your assets'
  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    await this.pathBuilder.init()

    const platform: string = await getPlatformType()
    const environment: string = await getEnvironmentType(true)

    const command: string = cleanup(environment, platform, this.pathBuilder)

    exec(command, (err, stdout, stderr) => {
		console.log(stderr)
      if (err) {
        this.log(JSON.stringify(stderr))
        this.log(JSON.stringify(err))
      } else {
        this.log('CLEANED UP')
      }
    });
  }
}

// "cleanup:win:client":"rmdir D:\\Builds\\Client\\Windows && del D:\\Builds\\Client\\Windows.tar.gz",
//   "cleanup:win:server":"rmdir D:\\Builds\\Server\\Windows && del D:\\Builds\\Server\\Windows.tar.gz",
//
//   "cleanup:s3":"aws s3 rm s3://server.magnumopus.gg/Windows.tar.gz && aws s3 rm s3://client.magnumopus.gg/Windows.tar.gz",
//
//   "cleanup:server":"rmdir C:\\Magnum-Opus\\Windows && del C:\\Magnum-Opus\\Windows.tar.gz"

