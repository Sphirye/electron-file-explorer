import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("Directory")
export default class Directory {
  name?: string
  subDirectories?: number
  size?: number
  files?: number
}