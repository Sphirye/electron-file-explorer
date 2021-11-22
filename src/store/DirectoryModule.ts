import Dialog from "@/models/vue/Dialog";
import store from "@/store/store"
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators"
import os from "os"

@Module({dynamic: true, store, name: "DialogModule"})
export default class DirectoryModule extends VuexModule {

  path: string = os.homedir()

  @Mutation
  setPath(path: string) {
    this.path = path
  }
}