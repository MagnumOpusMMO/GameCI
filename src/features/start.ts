import {BUILD_TYPE, ENVIRONMENT, PLATFORMS} from '../constants'
import {PathBuilder} from '../lib/common'

export const start = (
  buildType: string,
  environment: string,
  platform: string,
  map: string | undefined = 'Prelude',
  port: string,
  nClients = 1,
  pathBuilder: PathBuilder
  // eslint-disable-next-line max-params
): Array<string> => {
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

    for (let i = 0; i < nClients; i++) {
      commands.push(`${tempCommand} -game -log`)
    }
    commands.push(`${tempCommand} -server -nosteam -log -port=${port} ${map}?listen`)

    break

  case ENVIRONMENT.PRODUCTION:
    switch (platform) {
    case PLATFORMS.MAC:
      tempCommand = ''
      break

    case PLATFORMS.WIN:
      tempCommand = `Start-Process -FilePath ${unarchivedBuildPath}`
      break

    default:
      break
    }

    switch (buildType) {
    case BUILD_TYPE.CLIENT:
      tempCommand = ''
      break

    case BUILD_TYPE.SERVER:
      tempCommand = `${tempCommand} -ArgumentList "/Game/Maps/${map} -log"`
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
