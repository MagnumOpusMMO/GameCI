import {BUILD_TYPE, ENVIRONMENT, PLATFORMS} from '../constants'
import {PathBuilder} from '../lib/common'

export const start = (buildType: string, environment: string, platform: string, map: string, port: string, pathBuilder: PathBuilder): string => {
  const projectPath: string = pathBuilder.getProjectPath(platform)
  const unrealEditorPath: string = pathBuilder.getUnrealEditorPath(platform)
  const unarchivedBuildPath: string = pathBuilder.getArtifactUnarchivedBuildPath(platform)

  let command = ''

  switch (environment) {
  case ENVIRONMENT.DEVELOPMENT:
    switch (platform) {
    case PLATFORMS.MAC:
      command = `open ${unrealEditorPath} --args "${projectPath}"`
      break

    case PLATFORMS.WIN:
      command = `${unrealEditorPath} "${projectPath}"`
      break

    default:
      break
    }

    command = `${command} -game && ${command} -server -nosteam -log -port=${port} ${map}?listen`

    break

  case ENVIRONMENT.PRODUCTION:
    switch (platform) {
    case PLATFORMS.MAC:
      command = ''
      break

    case PLATFORMS.WIN:
      command = unarchivedBuildPath
      break

    default:
      break
    }

    switch (buildType) {
    case BUILD_TYPE.CLIENT:
      command = ''
      break

    case BUILD_TYPE.SERVER:
      command = `${command} /Game/Maps/${map} -log`
      break

    default:
      break
    }

    break

  default:
    break
  }

  return command
}
