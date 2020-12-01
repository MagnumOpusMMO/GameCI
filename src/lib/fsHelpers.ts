// eslint-disable-next-line unicorn/filename-case
import * as fs from 'fs-extra'

export const createFile = (path: string): void => {
  fs.writeFileSync(path, JSON.stringify({}))
}

export const loadFileAsJson = async (path: string): Promise<object> => {
  let config: object = {}

  try {
    config = await fs.readJSON(path)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return config
}

export const saveFile = (contents: string, path: string): void => {
  fs.writeFileSync(path, contents)
}
