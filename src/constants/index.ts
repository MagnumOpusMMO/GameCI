export const BUILD_TYPE: { CLIENT: string, SERVER: string } = {
  CLIENT: 'Client',
  SERVER: 'Server',
}

export const DEPLOY: { LOCAL: string, SERVER: string } = {
  LOCAL: 'LOCAL',
  SERVER: 'SERVER',
}

export const ENVIRONMENT: { DEVELOPMENT: string, PRODUCTION: string, S3: string } = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  S3: 's3',
}

export const PLATFORMS: { MAC: string, WIN: string } = {
  MAC: 'MAC',
  WIN: 'WIN',
}

export const MAPS: { LITANY: string, PRELUDE: string, CUSTOM: string } = {
  PRELUDE: 'Prelude',
  LITANY: 'Litany',
  CUSTOM: 'custom'
}

export const PORTS: { 7777: string, 7778: string } = {
  7777: '7777',
  7778: '7778',
}

export const MAP_CONFIGS: { [key: string]: { map: string, port: string } } = {
  [MAPS.PRELUDE]: { map: MAPS.PRELUDE, port: PORTS['7777'] },
  [MAPS.LITANY]: { map: MAPS.LITANY, port: PORTS['7778'] }
}

export const configPath: string = 'configs/gameCI.json'
