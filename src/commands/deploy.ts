import {Command} from '@oclif/command'
import {
  getBuildType,
  getDeployType, getEnvironmentType,
  getPlatformType, PathBuilder,
} from "../lib/common";
import { DEPLOY, ENVIRONMENT} from "../constants";
import {inject} from "../features/inject";
import {cleanup} from "../features/cleanup";
import {upload} from "../features/upload";
import {build} from "../features/build";
import {archive} from "../features/archive";
import {download} from "../features/download";
import {unarchive} from "../features/unarchive";
import {start} from "../features/start";

export default class Deploy extends Command {
  static description = 'Deploy your project'
  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async deploy(buildType: string, deployType: string, environmentType: string, platformType: string): Promise<string> {
    let command = ''

    switch (deployType) {
      case DEPLOY.LOCAL:
        // inject
        inject(environmentType, platformType, this.pathBuilder)

        // clean up local
        cleanup(environmentType, platformType, this.pathBuilder)

        // build
        build(buildType, platformType, this.pathBuilder)

        // archive
        archive(buildType, platformType, this.pathBuilder)

        // clean up s3
        cleanup(ENVIRONMENT.S3, platformType, this.pathBuilder)

        // upload
        upload(buildType, platformType, this.pathBuilder)

        break

      case DEPLOY.SERVER:
        // clean up server
        cleanup(environmentType, platformType, this.pathBuilder)

        // download
        download(platformType, this.pathBuilder)

        // unarchive
        unarchive(platformType, this.pathBuilder)

        // start server
        start(buildType, environmentType, platformType, 'Prelude', '7777', this.pathBuilder)
        start(buildType, environmentType, platformType, 'Litany', '7778', this.pathBuilder)

        break

      default:
        break
    }

    return command
  }

  async run() {
    await this.pathBuilder.init()

    const platformType: string = await getPlatformType()
    const deployType: string = await getDeployType()
    const environmentType: string = await getEnvironmentType()
    const buildType: string = await getBuildType()

    await this.deploy(buildType, deployType, environmentType, platformType)
  }
}
