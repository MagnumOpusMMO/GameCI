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

export const configPath: string = 'configs/gameCI.json'
