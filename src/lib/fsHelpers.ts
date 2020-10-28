import * as fs from 'fs-extra'

export const createFile = (path: string): void => {
    fs.writeFileSync(path, JSON.stringify({}))
}

export const loadFileAsJson = async (path: string): Promise<object> => {
  let config: object = {}

  try {
    config = await fs.readJSON(path)
  } catch (e) {
    console.log(e)
  }

  return config
}

export const saveFile = (contents: string, path: string): void => {
  fs.writeFileSync(path, contents)
}
