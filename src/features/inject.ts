import {PathBuilder} from "../lib/common";

export const inject =(environment: string, platform: string, pathBuilder: PathBuilder): string => {
  const environmentConfigPath = pathBuilder.getEnvironmentConfigPath(environment, platform)
  const defaultGamePath = pathBuilder.getDefaultConfigPath(platform)

  return `node src/env-inject.js ${environmentConfigPath} ${defaultGamePath}`
}
