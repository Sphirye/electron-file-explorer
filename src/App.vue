<template>
  <v-app>
    <DrawerComponent/>
    <WindowHeadComponent/>
    <v-main class="grey darken-4">
      <router-view :style="`overflow-y: auto; height: calc(100vh - (${$vuetify.application.top}px));`"/>
      <DialogComponent/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "@/components/HeaderComponent.vue"
import WindowHeadComponent from "@/components/WindowHeadComponent.vue"
import DrawerComponent from "@/components/DrawerComponent.vue"
import FooterComponent from "@/components/FooterComponent.vue"
import DialogComponent from "@/components/DialogComponent.vue"
import { getModule } from "vuex-module-decorators"
import DirectoryModule from "./store/DirectoryModule"

@Component({
  components: { HeaderComponent, DrawerComponent, FooterComponent, DialogComponent, WindowHeadComponent }
})

export default class App extends Vue {

}

</script>

<style>

html { 
  overflow-y: auto !important;
}

.header {
  -webkit-app-region: drag;
}

.header .control-button {
  -webkit-app-region: no-drag;
}


::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #b8b8b8;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(161, 161, 161);
}
</style>