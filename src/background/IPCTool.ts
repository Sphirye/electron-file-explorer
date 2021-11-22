import { BrowserWindow, ipcMain } from 'electron'
import FsTool from "@/services/tools/FsTool"
import fs from "fs"
import File from '@/models/File'
import Directory from '@/models/Directory'
import os from "os"
import { remote } from 'electron'
import { getModule } from 'vuex-module-decorators'
import DirectoryModule from '@/store/DirectoryModule'


let handlers = async (win: BrowserWindow) => {

  ipcMain.on('GET_DIR_DATA', async (event, payload) => {
    if (await FsTool.isAccesible(payload.path)) {
      let files: File[] = await FsTool.getFilesFromDir(payload.path)
      let directories: Directory[] = await FsTool.getDirectoriesFromDir(payload.path)
      getModule(DirectoryModule).setPath(payload.path)
      event.reply('GET_DIR_DATA', { files: files, directories: directories })
    } else {
      console.log("INACCESIBLE XDDD")
    }
  })

  ipcMain.on('MINIMIZE_APP', async (event) => {
    win.minimize()
  })

  ipcMain.on('MAXIMIZE_APP', async (event) => {
    console.log("IS MAXIMIZED:  " + win.isMaximized())
    console.log("IS MAXIMIZABLE:  " + win.isMaximizable())
    if (!win.isMaximized()) {
      win.maximize()
    } else if (win.isMaximizable()) {
      win.setSize(640, 480)
      win.center()
    }
    
  })
}

export default { handlers }