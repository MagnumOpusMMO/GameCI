import {exec} from 'child_process'
import {Command} from '@oclif/command'
import {
  getBuildType,
  getPlatformType,
  getEnvironmentType, PathBuilder, getMapConfig, getMapConfigFromMap, getNumberOfClients,
} from '../lib/common'
import {start} from '../features/start'
import {ENVIRONMENT} from '../constants'
import {cli} from 'cli-ux'

export default class Start extends Command {
  static description = 'Start your project'

  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    try {
      let buildType = ''

      await this.pathBuilder.init()

      const environment: string = await getEnvironmentType()
      const platform: string = await getPlatformType()
      const mapConfig: string = await getMapConfig()

      const {map, port}: { map: string; port: string } = await getMapConfigFromMap(mapConfig)

      if (environment !== ENVIRONMENT.DEVELOPMENT) {
        buildType = await getBuildType()
      }

      const nClients: string = await getNumberOfClients()

      const commands: Array<string> = start(
        buildType,
        environment,
        platform,
        map,
        port,
        parseInt(nClients, 10),
        this.pathBuilder
      )

      cli.action.start('starting game')
      commands.forEach(command => {
        exec(command, (err, stdout, stderr) => {
          if (err) {
            this.log(JSON.stringify(stderr))
            this.log(JSON.stringify(err))
          } else {
            this.log('STARTED')
          }
          cli.action.stop()
        })
      })
    } catch (error) {
      this.log(error)
    }
  }
}

// "start:client:mac": "open /Users/peterchau/UnrealEngine/Engine/Binaries/Mac/UE4Editor.app --args \"/Users/peterchau/Magnum-Opus/MagnumOpus.uproject\" -game",
//   "start:server:mac": "open /Users/peterchau/UnrealEngine/Engine/Binaries/Mac/UE4Editor.app --args \"/Users/peterchau/Magnum-Opus/MagnumOpus.uproject\" -server -log -port=7777",

// "// WINDOWS": "",

// "start:client:win": "D:\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe \"D:\\Magnum-Opus\\MagnumOpus.uproject\" -game",
// "start:server:prelude:win": "D:\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe \"D:\\Magnum-Opus\\MagnumOpus.uproject\" Prelude?listen -server -log -nosteam -port=7777",
// "start:server:litany:win": "D:\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe \"D:\\Magnum-Opus\\MagnumOpus.uproject\" Litany?listen -server -log -nosteam -port=7778",

// "run:prelude": "C:\\Magnum-Opus\\Windows\\MagnumOpus.exe /Game/Maps/Prelude -log",
//   "run:litany": "C:\\Magnum-Opus\\Windows\\MagnumOpus.exe /Game/Maps/Litany -log"
