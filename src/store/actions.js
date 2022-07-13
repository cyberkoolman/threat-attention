export const cleanAll = ({ dispatch }) => {
      dispatch("updateSettings", { apiEndpoint: undefined, apiToken: undefined });
    }
