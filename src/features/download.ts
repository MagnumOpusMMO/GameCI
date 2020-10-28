import {PLATFORMS} from "../constants";
import {PathBuilder} from "../lib/common";

export const download = (platform: string, pathBuilder: PathBuilder): string => {
  const artifactsDirPath: string = pathBuilder.getArtifactsDirPath(platform)
  const serverUrl: string = pathBuilder.getServerUrl(platform)
  const projectName: string = pathBuilder.getProjectName()

  let command = ''

  switch (platform) {
    case PLATFORMS.MAC:
      command = ''

      break
    case PLATFORMS.WIN:
      command = `powershell -command \"& { (New-Object Net.WebClient).DownloadFile(\'https://s3.amazonaws.com/${serverUrl}\', \'${artifactsDirPath}/${projectName}.zip\') }`
      break
    default:
      break
  }

  return command
}
