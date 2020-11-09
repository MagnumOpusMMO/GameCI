import {PathBuilder} from '../lib/common'
import {BUILD_TYPE, ENVIRONMENT, PLATFORMS} from '../constants'

export const cleanup = (environment: string, platform: string, pathBuilder: PathBuilder): string => {
  let command = ''

  const serverBuildPath: string = pathBuilder.getRenamedBuildPath(BUILD_TYPE.SERVER, platform)
  const clientBuildPath: string = pathBuilder.getRenamedBuildPath(BUILD_TYPE.CLIENT, platform)
  const artifactsBuildPath: string = pathBuilder.getArtifactsBuildPath(platform)
  const artifactsDirPath: string = pathBuilder.getArtifactsDirPath(platform)
  const winServerUrl: string = pathBuilder.getServerUrl(PLATFORMS.WIN)
  const macServerUrl: string = pathBuilder.getServerUrl(PLATFORMS.MAC)

  switch (environment) {
  case ENVIRONMENT.DEVELOPMENT:

    switch (platform) {
    case PLATFORMS.WIN:
      command = `rmdir -Recurse -Force -Path ${serverBuildPath} ; rmdir -Recurse -Force -Path ${clientBuildPath} ; rmdir -Recurse -Force -Path ${serverBuildPath}.zip ; rmdir -Recurse -Force -Path ${clientBuildPath}.zip`
      break

    case PLATFORMS.MAC:
      command = `rm -f ${serverBuildPath} && rm -f ${clientBuildPath}`
      break

    default:
      break
    }

    break
  case ENVIRONMENT.PRODUCTION:
    switch (platform) {
    case PLATFORMS.WIN:
      command = `rmdir -Recurse -Force -Path ${artifactsDirPath}/MagnumOpus ; del ${artifactsBuildPath}`
      break

    case PLATFORMS.MAC:	
      command = ''
      break

    default:
      break
    }

    break
  case ENVIRONMENT.S3:

    command = `aws s3 rm ${winServerUrl} && aws s3 rm ${macServerUrl}`
    break

  default:
    break
  }

  return command
}
