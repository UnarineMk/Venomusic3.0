import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState", //unique Idwith repect to other atoms or selectors
  default: null, // default value aka value
});

export const isPlayingState = atom({
  key: "isPlayingState", //unique Idwith repect to other atoms or selectors
  default: false, // default value aka val
});
