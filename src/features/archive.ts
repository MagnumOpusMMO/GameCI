import {PathBuilder} from '../lib/common'
import {PLATFORMS} from '../constants'

export const archive = (buildType: string, platform: string, pathBuilder: PathBuilder): string => {
  const buildPath: string = pathBuilder.getBuildPath(buildType, platform)
  const renamedBuildPath: string = pathBuilder.getRenamedBuildPath(buildType, platform)
  const projectName: string  = pathBuilder.getProjectName()
  const buildDir: string =  pathBuilder.getBuildDir(buildType, platform)

  let command = ''

  switch (platform) {
  case PLATFORMS.WIN:
    command = `ren "${buildPath}" ${projectName} && tar.exe -acf ${renamedBuildPath}.zip -C ${buildDir} ${projectName}`
    break
  case PLATFORMS.MAC:
    command = ''
    break
  default:
    break
  }

  return command
}
