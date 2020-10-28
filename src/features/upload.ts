import {BUILD_TYPE} from "../constants";
import {PathBuilder} from "../lib/common";

export const upload = (buildType: string, platform: string, pathBuilder: PathBuilder): string => {
  const renamedBuildPath: string = pathBuilder.getRenamedBuildPath(buildType, platform)
  const serverUrl: string = pathBuilder.getServerUrl(platform)
  const clientUrl: string = pathBuilder.getClientUrl(platform)

  let command = ''

  switch (buildType) {
    case BUILD_TYPE.CLIENT:
      command = `aws s3 cp ${renamedBuildPath}.zip s3://${clientUrl}`

      break
    case BUILD_TYPE.SERVER:
      command = `aws s3 cp ${renamedBuildPath}.zip s3://${serverUrl}`
      break
    default:
      break
  }

  return command
}
