import { BrowserWindow, ipcMain } from 'electron'
import FsTool from "@/services/tools/FsTool"
import fs from "fs"
import File from '@/models/File'
import Directory from '@/models/Directory'
import os from "os"
import { remote } from 'electron'

let handlers = (win: BrowserWindow) => {
  ipcMain.on('GET_DIR_DATA', async (event, payload) => {
    let files: File[] = await FsTool.getFilesFromDir(payload.path)
    let directories: Directory[] = await FsTool.getDirectoriesFromDir(payload.path)
    event.reply('GET_DIR_DATA', { files: files, directories: directories })
  })

  ipcMain.on('MINIMIZE_APP', async (event) => {
    win.minimize()
  })

  ipcMain.on('MAXIMIZE_APP', async (event) => {
    win.maximize()
  })
}

export default { handlers }