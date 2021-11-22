import fs from "fs"
import path from "path"
import os from "os"
import JsonTool from "@/services/tools/JsonTool"
import File from "@/models/File"
import Directory from "@/models/Directory"

export default class FsTool {

  static async isAccesible(path: string) {
    try {
      fs.accessSync(path, fs.constants.R_OK)
      return true
    } catch (err) {
      return false
    }
  }

  static async convertFile(filename: string, path: string) {
    if (await this.checkFile(filename, path)) {
      let file = new File()
      let stats = await this.getStats(filename, path)
      file.filename = filename
      file.size = stats.size
      file.path = os.homedir() + (path == undefined ? "/" : path)
      return file
    } else { return undefined }
  }

  static async convertDirectory(name: string, path: string) {
    if (await this.checkDirectory(name, path)) {
      let directory = new Directory()
      directory.name = name
      return directory
    } else { return null }
  }

  static async getFilesFromDir(path: string) {
    let files: File[] = []
    let filenames = await this.checkDir(path)

    for (const filename of filenames) {
      let file = await this.convertFile(filename, path)
      file ? files.push(file) : null
    }

    return files
  }

  static async getDirectoriesFromDir(path: string) {
    let directories: Directory[] = []
    let filenames = await this.checkDir(path)
    for (const filename of filenames) {
      let directory = await this.convertDirectory(filename, path)
      directory != null ? directories.push(directory) : null
    }
    return directories
  }

  static async getFoldersFromDir(path?: string) {

  }
  
  static async checkDir(path: string): Promise<string[]> {
    return fs.readdirSync(path)
  }

  static async checkFile(filename: string, path: string): Promise<boolean> {
    return fs.lstatSync(`${path}/${filename}`).isFile()
  }

  static async checkDirectory(filename: string, path: string): Promise<boolean> {
    return fs.lstatSync(`${path}/${filename}`).isDirectory()
  }

  static async getStats(filename: string, path: string): Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
      return fs.stat(path, (err, stat) => err != null ? reject(err) : resolve(stat))
    })
  }

}