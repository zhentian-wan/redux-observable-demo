export const SET_CONFIG = "SET_CONFIG";

export function setConfig(config) {
  return {
    type: SET_CONFIG,
    payload: config
  };
}
