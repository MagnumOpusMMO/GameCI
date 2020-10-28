const fs = require('fs')

function loadEnvConfig() {
  const envConfig = fs.readFileSync(process.argv[2])
  return JSON.parse(envConfig)
}

function loadProjectConfig() {
  const projectConfig = fs.readFileSync(process.argv[3], 'utf-8')
  return projectConfig
}

function saveProjectConfig(projectConfig) {
  fs.writeFileSync(process.argv[3], projectConfig)
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

const envConfig = loadEnvConfig()

const projectConfig = loadProjectConfig()
const injectedProjectConfig = envInject(envConfig, projectConfig)

saveProjectConfig(injectedProjectConfig)
