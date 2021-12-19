<template>
  <v-app-bar class="header" height="40px" flat dark app>

    <v-row no-gutters justify="center" align="center">
      <span>Electron Explorer</span>
      <v-spacer/>
      <div>
        <v-icon class="control-button" @click="minimizeWindow()">fas fa-minus-circle</v-icon>
        <v-icon class="control-button mx-2" @click="maximizeWindow()">fas fa-expand</v-icon>
        <v-icon class="control-button" @click="">fas fa-times-circle</v-icon>
      </div>
    </v-row>

  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { remote } from 'electron'

@Component
export default class WindowHeadComponent extends Vue {
  minimizeWindow() {
    window.ipc.send('MINIMIZE_APP')
  }

  maximizeWindow() {
    window.ipc.send('MAXIMIZE_APP')
  }

}

</script>