import Gitlab from "@/services/gitlab";

let gitlabApi = null;

function init(store) {
  gitlabApi = new Gitlab.Api({
    apiEndpoint: store.state.settings.apiEndpoint,
    apiToken: store.state.settings.apiToken
  });
}

function get() {
  return gitlabApi;
}

export default {
  get,
  init
};
