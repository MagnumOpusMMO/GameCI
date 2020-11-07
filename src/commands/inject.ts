import {Command} from '@oclif/command'
import {
  getEnvironmentType,
  getPlatformType, PathBuilder,
} from '../lib/common'
import {inject} from '../features/inject'

export default class Inject extends Command {
  static description = 'Inject environment variables your project'

  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    await this.pathBuilder.init()

    const platform: string = await getPlatformType()
    const environment: string = await getEnvironmentType()

    inject(environment, platform, this.pathBuilder)
    this.log('INJECTED')
  }
}

// "envInject:development:win": "node src/env-inject.ts configs/development.json \"D:\\Magnum-Opus\\Config\\DefaultGame.ini\"",
//
//   "envInject:production:win": "node src/env-inject.ts configs/production.json \"D:\\Magnum-Opus\\Config\\DefaultGame.ini\"",
