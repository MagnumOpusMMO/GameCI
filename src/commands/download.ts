import {exec} from 'child_process'
import {Command} from '@oclif/command'
import {
  getPlatformType, PathBuilder,
} from '../lib/common'
import {download} from '../features/download'

export default class Download extends Command {
  static description = 'Download your project'

  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    await this.pathBuilder.init()

    const platformType: string = await getPlatformType()

    const command: string = download(platformType, this.pathBuilder)

    exec(command, (err, stdout, stderr) => {
      if (err) {
        this.log(JSON.stringify(stderr))
        this.log(JSON.stringify(err))
      } else {
        this.log('DOWNLOADED')
      }
    })
  }
}

// "download": "powershell -command \"& { (New-Object Net.WebClient).DownloadFile('https://s3.amazonaws.com/server.magnumopus.gg/Windows.tar.gz', 'C:\\Magnum-Opus') }",
