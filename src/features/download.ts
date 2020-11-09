import {PLATFORMS} from "../constants";
import {PathBuilder} from "../lib/common";

export const download = (platform: string, pathBuilder: PathBuilder): string => {
  const artifactsBuildPath: string = pathBuilder.getArtifactsBuildPath(platform)
  const serverUrl: string = pathBuilder.getServerUrl(platform)
  const projectName: string = pathBuilder.getProjectName()

  let command = ''

  switch (platform) {
    case PLATFORMS.MAC:
      command = ''

      break
    case PLATFORMS.WIN:
      command = `Invoke-WebRequest -Uri https://s3.amazonaws.com/${serverUrl}/windows/${projectName}.zip -OutFile ${artifactsBuildPath}`
      break
    default:
      break
  }

  return command
}
