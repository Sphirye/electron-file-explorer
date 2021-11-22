import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("File")
export default class File {
  filename?: string
  size?: number
  path?: string
}