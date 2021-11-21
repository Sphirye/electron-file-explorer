<template>
  <v-app>
    <HeaderComponent/>
    <DrawerComponent/>
    <v-main>
      <router-view/>
      <FooterComponent/>
    </v-main>
    <DialogComponent/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "@/components/HeaderComponent.vue"
import DrawerComponent from "@/components/DrawerComponent.vue"
import FooterComponent from "@/components/FooterComponent.vue"
import DialogComponent from "@/components/DialogComponent.vue"

@Component({
  components: { HeaderComponent, DrawerComponent, FooterComponent, DialogComponent }
})

export default class App extends Vue {

}

</script>
