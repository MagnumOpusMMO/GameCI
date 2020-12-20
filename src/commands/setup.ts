import {Command} from '@oclif/command'
import {createFile, saveFile} from '../lib/fsHelpers'
import cli from 'cli-ux'
import {PLATFORMS} from '../constants'
import {getConfig, getConfigPath, getPlatformType} from '../lib/common'
import * as fs from 'fs-extra'

export default class Setup extends Command {
  static description = 'Setup GameCI for your project'

  private configPath: string = getConfigPath(this.config.configDir)

  // eslint-disable-next-line max-params
  updateConfig(
    platform: string,
    projectName: string,
    projectDir: string,
    unrealDir: string,
    buildsDir: string,
    artifactsDir: string,
    clientS3Bucket: string,
    serverS3Bucket: string,
    config: any
  ): {} {
    const updatedConfig = config

    updatedConfig.PROJECT_NAME = projectName
    updatedConfig[platform] = {}
    updatedConfig[platform].PROJECT_DIR = projectDir
    updatedConfig[platform].UNREAL_DIR = unrealDir
    updatedConfig[platform].BUILDS_DIR = buildsDir
    updatedConfig[platform].ARTIFACTS_DIR = artifactsDir
    updatedConfig.CLIENT_URL = clientS3Bucket
    updatedConfig.SERVER_URL = serverS3Bucket

    return updatedConfig
  }

  firstRun() {
    if (!fs.existsSync(this.config.configDir)) {
      fs.mkdirpSync(this.config.configDir)
    }

    if (!fs.existsSync(this.configPath)) {
      createFile(this.configPath)
    }
  }

  async run() {
    try {
      this.firstRun()

      const config: {} = await getConfig(this.configPath)

      const projectName: string = await cli.prompt('What project\'s .uproject name? ex: MagnumOpus')
      const platform: string = await getPlatformType()

      const exampleProjectDir: string = platform === PLATFORMS.MAC ?
        '/Users/USER_NAME/PROJECT_NAME' :
        'C:\\Magnum-Opus'
      const exampleUnrealDir: string = platform === PLATFORMS.MAC ?
        '/Users/USER_NAME/UnrealEngine/Engine' :
        'C:\\UnrealEngine'
      const exampleBuildsDir: string = platform === PLATFORMS.MAC ?
        '/Users/USER_NAME/Builds' :
        'C:\\Builds'
      const exampleArtifactsDir: string = platform === PLATFORMS.MAC ?
        '/Users/USER_NAME/MagnumOpus/Artifacts' :
        'C:\\Artifacts'
      const exampleClientS3Bucket = 'client.magnumopus.gg'
      const exampleServerS3Bucket = 'server.magnumopus.gg'

      const projectDir: string = await cli.prompt(`What project's full path? ex: ${exampleProjectDir}`)
      const unrealDir: string = await cli.prompt(`What Unreal Engine's full path? ex: ${exampleUnrealDir}`)
      const buildsDir: string = await cli.prompt(`What the Builds directory's full path? ex: ${exampleBuildsDir}`)
      const artifactsDir: string = await cli.prompt(`What the Artifacts directory's full path? ex: ${exampleArtifactsDir}`)
      const clientS3Bucket: string = await cli.prompt(`What the URL of the client S3 bucket? ex: ${exampleClientS3Bucket}`)
      const serverS3Bucket: string = await cli.prompt(`What the URL of the server S3 bucket? ex: ${exampleServerS3Bucket}`)

      const updatedConfig = this.updateConfig(
        platform,
        projectName,
        projectDir,
        unrealDir,
        buildsDir,
        artifactsDir,
        clientS3Bucket,
        serverS3Bucket,
        config
      )

      saveFile(JSON.stringify(updatedConfig, null, 2), this.configPath)
    } catch (error) {
      // eslint-disable-next-line no-console
      this.log(error)
    }
  }
}
