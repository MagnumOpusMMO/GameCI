const fs = require('fs')

const loadEnvConfig = (environmentConfigPath: string): object => {
  const envConfig: string = fs.readFileSync(environmentConfigPath)
  return JSON.parse(envConfig)
}

const loadProjectConfig = (defaultGamePath: string): string => {
  return fs.readFileSync(defaultGamePath, 'utf-8')
}

const saveProjectConfig = (projectConfig: string, defaultGamePath: string): void => {
  fs.writeFileSync(defaultGamePath, projectConfig)
}

const replaceValue = (key: string, envConfig: any, srcString: string): string => {
  const newValue = envConfig[key]
  const splitOnKey = srcString.split(`${key}=`)
  const splitAfterValue = splitOnKey[1].split('\n')
  const afterValue = splitAfterValue.slice(1).join('\n')
  return `${splitOnKey[0]}${key}=${newValue}\n${afterValue}`
}

const envInject = (envConfig: object, projectConfig: string): string => {
  let injectedProjectConfig = projectConfig

  /* eslint-disable-next-line guard-for-in */
  for (const key in envConfig) {
    injectedProjectConfig = replaceValue(key, envConfig, injectedProjectConfig)
  }

  return injectedProjectConfig
}

const main = (environmentConfigPath: string, defaultGamePath: string): void => {
  const envConfig: object = loadEnvConfig(environmentConfigPath)
  const projectConfig: string = loadProjectConfig(defaultGamePath)
  const injectedProjectConfig: string = envInject(envConfig, projectConfig)

  saveProjectConfig(injectedProjectConfig, defaultGamePath)
}

export default main
