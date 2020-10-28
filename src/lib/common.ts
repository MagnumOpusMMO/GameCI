import * as inquirer from "inquirer";
import {BUILD_TYPE, DEPLOY, ENVIRONMENT, PLATFORMS} from "../constants";
import {loadFileAsJson} from "./fsHelpers";
import cli from "cli-ux";
import * as path from "path";

export const getConfigPath = (configDir: string): string => path.join(configDir, 'gameCI.json')
export const getConfig = async (configPath: string): Promise<{}> => await loadFileAsJson(configPath)

// paths
export class PathBuilder {
  private readonly configPath: string
  private config: any = {}

  constructor (configDir: string) {
    this.configPath = getConfigPath(configDir)
  }

  async init() {
    this.config = await getConfig(this.configPath)
  }

  getArtifactsBuildPath = (platform: string): string => {
    const artifactsDirPath: string = this.getArtifactsDirPath(platform)
    const projectName: string = this.getProjectName()
    let artifactsBuildPath = ''

    switch (platform) {
      case PLATFORMS.WIN:
        artifactsBuildPath = `${artifactsDirPath}/${projectName}.zip`
        break
      case PLATFORMS.MAC:
        artifactsBuildPath = ''
        break
      default:
        break
    }

    return artifactsBuildPath
  }

  getArtifactsDirPath = (platform: string): string => this.config[platform].ARTIFACTS_DIR

  getBuildDir = (buildType: string, platform: string): string => `${this.config[platform].BUILDS_DIR}/${buildType}`

  getBuildPath = (buildType: string, platform: string): string => {
    const buildDirPath: string = this.getBuildDir(buildType, platform)

    let buildPath = ''
    switch (platform) {
      case PLATFORMS.WIN:
        buildPath = `${buildDirPath}/Windows`
        break
      case PLATFORMS.MAC:
        buildPath = `${buildDirPath}/Mac`
        break
      default:
        break
    }

	switch (buildType) {
      case BUILD_TYPE.SERVER:
        buildPath =  buildPath + 'Server'
        break
      case BUILD_TYPE.CLIENT:
        buildPath =  buildPath + 'NoEditor'
        break
      default:
        break
    }

    return buildPath
  }

  getBuildToolPath = (platform: string): string => {
    const enginePath = this.getEnginePath(platform)
    let buildPath = ''

    switch (platform) {
      case PLATFORMS.WIN:
        buildPath = `${enginePath}/Engine/Build/BatchFiles/RunUAT`
        break
      case PLATFORMS.MAC:
        buildPath = `${enginePath}/BatchFiles/RunUAT.sh`
        break
      default:
        break
    }

    return buildPath
  }

  getClientDirUrl = (): string => this.config.CLIENT_URL

  getClientUrl = (platform: string): string => {
    const clientDirUrl: string = this.getClientDirUrl()
    const projectName: string = this.getProjectName()
    let clientUrl = ''

    switch (platform) {
      case PLATFORMS.WIN:
        clientUrl = `${clientDirUrl}/windows/${projectName}.zip`
        break
      case PLATFORMS.MAC:
        clientUrl = `${clientDirUrl}/mac/${projectName}.zip`
        break
      default:
        break
    }

    return clientUrl
  }

  getDefaultConfigPath = (platform: string): string => `${this.config[platform].PROJECT_DIR}/Config/DefaultGame.ini`

  getEnginePath = (platform: string): string => this.config[platform].UNREAL_DIR

  getEnvironmentConfigPath = (environment: string, platform: string): string => {
    const projectPath: string = this.getProjectDirPath(platform)
    return `${projectPath}/Config/${environment}.json`
  }

  getProjectDirPath = (platform: string): string => this.config[platform].PROJECT_DIR

  getProjectName = (): string => this.config.PROJECT_NAME

  getProjectPath = (platform: string): string => {
    const projectDirPath: string = this.getProjectDirPath(platform)
    const projectName: string = this.getProjectName()
    return `${projectDirPath}/${projectName}.uproject`
  }

  getRenamedBuildPath = (buildType: string, platform: string): string => {
    const buildDirPath: string = this.getBuildDir(buildType, platform)
    const projectName: string = this.getProjectName()
    return `${buildDirPath}/${projectName}`
  }

  getServerDirUrl = (): string => this.config.SERVER_URL

  getServerUrl = (platform: string): string => {
    const serverDirUrl: string = this.getServerDirUrl()
    const projectName: string = this.getProjectName()
    let serverUrl = ''

    switch (platform) {
      case PLATFORMS.WIN:
        serverUrl = `${serverDirUrl}/windows/${projectName}.zip`
        break
      case PLATFORMS.MAC:
        serverUrl = `${serverDirUrl}/mac/${projectName}.zip`
        break
      default:
        break
    }

    return serverUrl
  }

  getArtifactUnarchivedBuildPath = (platform: string): string => {
    const projectName: string = this.getProjectName()
    const archiveDirPath: string = this.getArtifactsDirPath(platform)

    return `${archiveDirPath}/${projectName}.exe`
  }

  getUnrealEditorPath = (platform: string): string => {
    const enginePath = this.getEnginePath(platform)
    let buildPath = ''

    switch (platform) {
      case PLATFORMS.WIN:
        buildPath = `${enginePath}/Binaries/Mac/UE4Editor.app`
        break
      case PLATFORMS.MAC:
        buildPath = `${enginePath}/Binaries/Win64/UE4Editor.exe`
        break
      default:
        break
    }

    return buildPath
  }
}

// prompts
export const getBuildType = async (): Promise<string> => {
  const responses: { platform: string } = await inquirer.prompt([{
    name: 'platform',
    message: 'select a build type.',
    type: 'list',
    choices: [{name: BUILD_TYPE.CLIENT}, {name: BUILD_TYPE.SERVER}],
  }])
  return responses.platform
}

export const getDeployType = async (): Promise<string> => {
  const responses: { platform: string } = await inquirer.prompt([{
    name: 'deploy',
    message: 'select a deploy type',
    type: 'list',
    choices: [{name: DEPLOY.LOCAL}, {name: DEPLOY.SERVER}],
  }])

  return responses.platform
}

export const getEnvironmentType = async (includeS3: boolean = false): Promise<string> => {
  let choices = [{name: ENVIRONMENT.DEVELOPMENT}, {name: ENVIRONMENT.PRODUCTION}]

  if (includeS3) choices.push({name: ENVIRONMENT.S3})

  const responses: { environment: string } = await inquirer.prompt([{
    name: 'environment',
    message: 'select an environment',
    type: 'list',
    choices
  }])

  return responses.environment
}

export const getMap = async (): Promise<string> => {
  const map: string= await cli.prompt(`What map should the server run? ex: Litany`)

  return map
}

export const getPlatformType = async (): Promise<string> => {
  const responses: { platform: string } = await inquirer.prompt([{
    name: 'platform',
    message: 'select a platform',
    type: 'list',
    choices: [{name: PLATFORMS.MAC}, {name: PLATFORMS.WIN}],
  }])

  return responses.platform
}

export const getPort = async (): Promise<string> => {
  const port: string= await cli.prompt(`What port should the server run on? ex: 7777`)

  return port
}
