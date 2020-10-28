import { PathBuilder } from "../lib/common";
import {BUILD_TYPE, ENVIRONMENT, PLATFORMS} from "../constants";

export const cleanup = (environment: string, platform: string, pathBuilder: PathBuilder): string => {
  let command = ''

  switch (environment) {
    case ENVIRONMENT.DEVELOPMENT:
      const serverBuildPath: string = pathBuilder.getRenamedBuildPath(BUILD_TYPE.SERVER, platform)
      const clientBuildPath: string = pathBuilder.getRenamedBuildPath(BUILD_TYPE.CLIENT, platform)

      switch (platform) {
        case PLATFORMS.WIN:
          command = `rmdir ${serverBuildPath} && del ${serverBuildPath}.zip && rmdir ${clientBuildPath} && del ${clientBuildPath}.zip`
          break

        case PLATFORMS.MAC:
          command = `rm -f ${serverBuildPath} && rm ${serverBuildPath}.zip && rm -f ${clientBuildPath} && rm ${clientBuildPath}.zip`
          break

        default:
          break

      }
      break

    case ENVIRONMENT.PRODUCTION:
      const artifactsBuildPath: string = pathBuilder.getArtifactsBuildPath(platform)
      const artifactsDirPath: string = pathBuilder.getArtifactsDirPath(platform)

      switch (platform) {
        case PLATFORMS.WIN:
          command = `rmdir ${artifactsDirPath}/MagnumOpus && del ${artifactsBuildPath}`
          break

        case PLATFORMS.MAC:
          command = ''
          break

        default:
          break

      }

      break

    case ENVIRONMENT.S3:
      const winServerUrl: string = pathBuilder.getServerUrl(PLATFORMS.WIN)
      const macServerUrl: string = pathBuilder.getServerUrl(PLATFORMS.MAC)

      command = `aws s3 rm ${winServerUrl} && aws s3 rm ${macServerUrl}`
      break

    default:
      break

  }

  return command
}
