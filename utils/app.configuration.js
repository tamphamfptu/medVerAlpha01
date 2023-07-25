import { Audio } from "expo-av";

export const configOptionsGlobal = {
  allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  staysActiveInBackground: true,
  playThroughEarpieceAndroid: true,
};

export const configAudio = async () => {
  try {
    await Audio.setAudioModeAsync(configOptionsGlobal);
  } catch (e) {
    console.log(e);
  }
};
