import {PLATFORMS} from '../constants'
import {PathBuilder} from '../lib/common'

export const unarchive = (platform: string, pathBuilder: PathBuilder): string => {
  const artifactsBuildPath: string = pathBuilder.getArtifactsBuildPath(platform)
  const artifactsPath: string = pathBuilder.getArtifactsDirPath(platform)

  let command = ''

  switch (platform) {
  case PLATFORMS.WIN:
    command = `powershell -command "Expand-Archive -Force ${artifactsBuildPath} ${artifactsPath}"`
    break
  case PLATFORMS.MAC:
    command = ''
    break
  default:
    break
  }

  return command
}
