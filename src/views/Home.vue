<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-btn dark @click="backFolder()" class="mx-3" icon>
        <v-icon size="40">far fa-arrow-alt-circle-left</v-icon>
      </v-btn>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" sm="3" md="2" v-for="(folder, key) in folders" :key="key + '-folder'">
        <v-card @click="openFolder(folder.name)" flat class="transparent" dark width="100%" height="auto">
          <v-sheet class="transparent d-flex justify-center align-center" height="100px" width="100%">
            <v-icon color="brown" size="100">fas fa-folder</v-icon>
          </v-sheet>
          <v-card-text class="pt-0">
            <span v-line-clamp="2" class="text-h6 text-center">{{folder.name}}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3" md="2" v-for="(file, key) in files" :key="key + '-file'">
        <v-card @click="log(file)" flat class="transparent" dark width="100%" height="auto">
          <v-sheet class="transparent d-flex justify-center align-center" height="100px" width="100%">
            <v-icon color="grey lighten-1" size="90">{{getExtensionFile(file)}}</v-icon>
          </v-sheet>
          <v-card-text>
            <span v-line-clamp="2" class="text-h6 text-center">{{file.filename}}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import DefaultComponent from "@/components/DefaultComponent.vue"
import { getModule } from "vuex-module-decorators"
import Dialog from "@/models/vue/Dialog"
import File from "@/models/File"
import Directory from "@/models/Directory"
import DialogModule from "@/store/DialogModule"
import DirectoryModule from "@/store/DirectoryModule"

@Component({
  components: { DefaultComponent }
})

export default class Home extends Vue {

  directoryModule: DirectoryModule = getModule(DirectoryModule)
  get path() { return this.directoryModule.path }

  directory: Directory = new Directory()
  files: File[] = []
  folders: Directory[] = []

  dir: any = undefined

  backFolder() {
    let path = this.path

    //Makes sure theres not a / at final path char
    //if (path.lastIndexOf('/') == path.length - 1) {
    //  path = path.slice(path.length - 1, path.length)
    //}

    path = path.slice(0, path.lastIndexOf('/') + 1)
    if (path.length != 0) {
      this.directoryModule.setPath(path)
      this.refresh()
      console.log(path)
    }
  }

  openFolder(v: any) {
    let path = (this.path) + (this.path.lastIndexOf('/') != this.path.length - 1 ? '/' : '') + v
    this.directoryModule.setPath(path)
    this.refresh()
    console.log(path)
  }

  mounted() {
    this.refresh()
  }

  refresh() {
    window.ipc.send('GET_DIR_DATA', { path: this.path })
    this.getDirData()
  }

  getDirData() {
    window.ipc.on('GET_DIR_DATA', (payload: any) => {
      this.files.splice(0, this.files.length)
      this.folders.splice(0, this.folders.length)

      this.files = payload.files
      this.folders = payload.directories
    })
  }

  openDialog() {
    getModule(DialogModule).showDialog(
      new Dialog("Aviso", "¿Desea continuar?", () =>
        alert("Usted ha continuado. :)")
      )
    )
  }

  log(file: File) {
    console.log(file.filename!.match(/\.[0-9a-z]{1,5}$/i))
  }

  getExtensionFile(file: File) {
    let extension: string = (file.filename!.match(/\.[0-9a-z]{1,5}$/i) || [""])[0]

    switch (extension) {
      case (".png"): { return("fas fa-image") }
      case (".gif"): { return("fas fa-image") }
      case (".jpeg"): { return("fas fa-image") }
      case (".jpg"): { return("fas fa-image") }
      case (".wav"): { return("fas fa-music") }
      case (".m4a"): { return("fas fa-music") }
      case (".ogg"): { return("fas fa-music") }
      case (".mp3"): { return("fas fa-music") }
      case (".mp4"): { return("fas fa-film") }
      case (".txt"): { return("fas fa-file-alt") }
      case (".pdf"): { return("fas fa-file-pdf") }
    
      default: { return("fas fa-file") }
    }
  }

}

</script>