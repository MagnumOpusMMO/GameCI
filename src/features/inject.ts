import {PathBuilder} from '../lib/common'
import injectEnv from '../lib/env-inject'

export const inject = (environment: string, platform: string, pathBuilder: PathBuilder): void => {
  const environmentConfigPath = pathBuilder.getEnvironmentConfigPath(environment, platform)
  const defaultGamePath = pathBuilder.getDefaultConfigPath(platform)

  injectEnv(environmentConfigPath, defaultGamePath)
}
