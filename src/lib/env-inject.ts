const fs = require('fs')

function loadEnvConfig(environmentConfigPath) {
  const envConfig = fs.readFileSync(environmentConfigPath)
  return JSON.parse(envConfig)
}

function loadProjectConfig(defaultGamePath) {
  const projectConfig = fs.readFileSync(defaultGamePath, 'utf-8')
  return projectConfig
}

function saveProjectConfig(projectConfig, defaultGamePath) {
  fs.writeFileSync(defaultGamePath, projectConfig)
}

function replaceValue(key, envConfig, srcString) {
  const newValue = envConfig[key]
  const splitOnKey = srcString.split(`${key}=`)
  const splitAfterValue = splitOnKey[1].split('\n')
  const afterValue = splitAfterValue.slice(1).join('\n')
  return `${splitOnKey[0]}${key}=${newValue}\n${afterValue}`
}

function envInject(envConfig, projectConfig) {
  let injectedProjectConfig = projectConfig

  /* eslint-disable-next-line guard-for-in */
  for (const key in envConfig) {
    injectedProjectConfig = replaceValue(key, envConfig, injectedProjectConfig)
  }

  return injectedProjectConfig
}

const inject = function (environmentConfigPath, defaultGamePath) {
  const envConfig = loadEnvConfig(environmentConfigPath)
  const projectConfig = loadProjectConfig(defaultGamePath)
  const injectedProjectConfig = envInject(envConfig, projectConfig)

  saveProjectConfig(injectedProjectConfig, defaultGamePath)
}

export default inject
