import Client from "./client";
import EventEmitter from "eventemitter3";

export default class Api extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.client = new Client(options.apiEndpoint, options.apiToken);
  }
}