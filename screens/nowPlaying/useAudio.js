import { useEffect, useState, useCallback, useMemo } from "react";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { MILLI_SECOND } from "../../constants/app";
import { nowPlayingAction } from "../../redux/audio/nowPlayingList.slice";

const useAudio = () => {
  const audioList = useSelector((state) => state.nowPlayingList.playingList);
  const currentAudioId = useSelector(
    (state) => state.nowPlayingList.currentPlaying.currentAudioIndex
  );
  const [sound, setSound] = useState(null);
  const [soundStatus, setSoundStatus] = useState({
    isSoundLoaded: false,
    isPlaying: false,
    positionMillis: 0,
    durationMillis: "",
    songRunningInPercentage: 0,
  });
  const dispatch = useDispatch();
  const setCurrentAudioIndex = (index) => {
    dispatch(nowPlayingAction.setNowPlayingAudioId(index));
  };
  const currentAudioIndex = useMemo(
    () => (currentAudioId !== undefined ? currentAudioId : 0),
    [currentAudioId]
  );
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadSound = useCallback(async () => {
    if (!audioList || audioList.length === 0) return;
    console.log(audioList);
    const { url } = audioList[currentAudioIndex];
    try {
      console.log("Sound Loading...", url);
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: url,
        },
        { shouldPlay: true }
      );
      setSound((prevSound) => {
        if (prevSound) {
          prevSound.unloadAsync();
        }
        return sound;
      });
      if (soundStatus.positionMillis) {
        handleUpdateSoundTime(soundStatus.positionMillis);
      }
      const status = await sound.getStatusAsync();
      setSoundStatus((prevStatus) => ({
        ...prevStatus,
        isSoundLoaded: true,
        isPlaying: true,
        positionMillis: status.positionMillis,
        durationMillis: status.durationMillis,
        songRunningInPercentage: +(
          (status.positionMillis / status.durationMillis) *
          100
        ).toFixed(0),
      }));
    } catch (error) {
      console.log("Error loading sound:", error);
    }
  }, [audioList, currentAudioIndex, soundStatus.positionMillis]);

  const playSound = useCallback(async () => {
    try {
      console.log("Sound playing...");
      if (sound) {
        await sound.playAsync();
        setSoundStatus((prevStatus) => ({ ...prevStatus, isPlaying: true }));
      }
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  }, [sound]);

  const pauseSound = useCallback(async () => {
    console.log("Audio paused....");
    if (sound) {
      await sound.pauseAsync();
      setSoundStatus((prevStatus) => ({ ...prevStatus, isPlaying: false }));
    }
  }, [sound]);

  const playNextSound = useCallback(async () => {
    if (sound) {
      sound.unloadAsync();
    }
    const nextIndex = (currentAudioIndex + 1) % audioList.length;
    setCurrentAudioIndex(nextIndex);
    setSoundStatus((prevStatus) => ({ ...prevStatus, isPlaying: false }));
  }, [audioList, currentAudioIndex, sound]);

  const playPrevSound = useCallback(() => {
    if (sound) {
      sound.unloadAsync();
    }
    const prevIndex =
      (currentAudioIndex - 1 + audioList.length) % audioList.length;
    setCurrentAudioIndex(prevIndex);
    setSoundStatus((prevStatus) => ({ ...prevStatus, isPlaying: false }));
  }, [audioList, currentAudioIndex, sound]);

  const handleChangeSoundTimeline = useCallback(
    (value) => {
      let upcomingTime = +((soundStatus.durationMillis * value) / 100).toFixed(
        0
      );
      handleUpdateSoundTime(upcomingTime);
    },
    [soundStatus.durationMillis]
  );

  const handleAdd10Second = useCallback(() => {
    let upcomingTime = soundStatus.positionMillis + MILLI_SECOND * 10;
    handleUpdateSoundTime(upcomingTime);
  }, [soundStatus.positionMillis]);
  const handleMinor10Second = useCallback(() => {
    let upcomingTime = soundStatus.positionMillis - MILLI_SECOND * 10;
    handleUpdateSoundTime(upcomingTime);
  }, [soundStatus.positionMillis]);
  const handleUpdateSoundTime = useCallback(
    async (positionMillis) => {
      try {
        if (!sound) return;
        await sound.setPositionAsync(positionMillis);
        await sound.playFromPositionAsync(positionMillis);
      } catch (error) {
        console.log("Error playing audio:", error);
      }
    },
    [sound]
  );
  const handlePlaySongWithIndex = useCallback(
    async (index) => {
      if (sound) {
        sound.unloadAsync();
      }
      if (!index) return;
      console.log(index);
      setCurrentAudioIndex(index);
      setSoundStatus((prevStatus) => ({ ...prevStatus, isPlaying: false }));
    },
    [audioList, currentAudioIndex, sound]
  );

  useEffect(() => {
    loadSound();
  }, [currentAudioIndex]);

  useEffect(() => {
    const timer = setInterval(async () => {
      if (sound && soundStatus.isSoundLoaded) {
        const status = await sound.getStatusAsync();
        setSoundStatus((prevStatus) => ({
          ...prevStatus,
          positionMillis: status.positionMillis,
          durationMillis: status.durationMillis,
          songRunningInPercentage: +(
            (status.positionMillis / status.durationMillis) *
            100
          ).toFixed(0),
        }));
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [sound, soundStatus.isSoundLoaded]);

  return {
    sound,
    soundStatus,
    currentAudioIndex,
    loadSound,
    playSound,
    pauseSound,
    playNextSound,
    playPrevSound,
    handleChangeSoundTimeline,
    handleMinor10Second,
    handleAdd10Second,
    handleUpdateSoundTime,
    handlePlaySongWithIndex,
  };
};
export default useAudio;
