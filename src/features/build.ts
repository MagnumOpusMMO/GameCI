import {PathBuilder} from '../lib/common'
import {BUILD_TYPE, PLATFORMS} from '../constants'

export const build = (buildType: string, platform: string, pathBuilder: PathBuilder): string => {
  const buildDirPath: string = pathBuilder.getBuildDir(buildType, platform)
  const buildToolPath: string = pathBuilder.getBuildToolPath(platform)
  const projectPath: string = pathBuilder.getProjectPath(platform)

  let command = `${buildToolPath} BuildCookRun -project="${projectPath}" -noP4 -build -clientconfig=Shipping -serverconfig=Shipping -cook -allmaps -stage -pak -archive -archivedirectory="${buildDirPath}"`

  switch (platform) {
  case PLATFORMS.MAC:
    command = `${command} -platform=Mac`

    break
  case PLATFORMS.WIN:
    command = `${command} -platform=Win64`

    if (buildType === BUILD_TYPE.SERVER) {
      command = `${command} -server -serverplatform=Win64 -noclient`
    }

    break
  default:
    break
  }

  return command
}
