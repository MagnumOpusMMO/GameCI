import {BUILD_TYPE, ENVIRONMENT, PLATFORMS} from '../constants'
import {PathBuilder} from '../lib/common'

export const start = (buildType: string, environment: string, platform: string, map: string, port: string, pathBuilder: PathBuilder): Array<string> => {
  const projectPath: string = pathBuilder.getProjectPath(platform)
  const unrealEditorPath: string = pathBuilder.getUnrealEditorPath(platform)
  const unarchivedBuildPath: string = pathBuilder.getArtifactUnarchivedBuildPath(platform)

  const commands: Array<string> = []
  let tempCommand = ''

  switch (environment) {
  case ENVIRONMENT.DEVELOPMENT:
    switch (platform) {
    case PLATFORMS.MAC:
      tempCommand = `open ${unrealEditorPath} --args "${projectPath}"`
      break

    case PLATFORMS.WIN:
      tempCommand = `${unrealEditorPath} "${projectPath}"`
      break

    default:
      break
    }

    commands.push(`${tempCommand} -game`)
    commands.push(`${tempCommand} -server -nosteam -log -port=${port} ${map}?listen`)

    break

  case ENVIRONMENT.PRODUCTION:
    switch (platform) {
    case PLATFORMS.MAC:
      tempCommand = ''
      break

    case PLATFORMS.WIN:
      tempCommand = unarchivedBuildPath
      break

    default:
      break
    }

    switch (buildType) {
    case BUILD_TYPE.CLIENT:
      tempCommand = ''
      break

    case BUILD_TYPE.SERVER:
      tempCommand = `${tempCommand} /Game/Maps/${map} -log`
      break

    default:
      break
    }

    commands.push(tempCommand)
    break

  default:
    break
  }

  return commands
}
