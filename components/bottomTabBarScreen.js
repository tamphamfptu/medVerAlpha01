import React, { useCallback, useState } from "react";
import {
  BackHandler,
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import ExploreScreen from "../screens/explore/exploreScreen";
import TrendingScreen from "../screens/trending/trendingScreen";
import SettingsScreen from "../screens/settings/settingsScreen";
import LibraryScreen from "../screens/library/libraryScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { useFocusEffect } from "@react-navigation/native";
import ProfileScreen from "../screens/Profile/profileScreen";
import {
  ACTION_TYPE,
  nowPlayingAction,
} from "../redux/audio/nowPlayingList.slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "../constants/navigate";
import IntroAIScreen from "../screens/introAi/introduceAiScreen";

const { width } = Dimensions.get("window");

const BottomTabBarScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const audioPlayer = (audioAction, audioActionVaue) => {
    dispatch(
      nowPlayingAction.triggerAudioPlayer({
        audioAction: audioAction,
        audioActionVaue: audioActionVaue,
      })
    );
  };
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };
  const { currentAudioIndex, soundStatus } = useSelector(
    (state) => state.nowPlayingList.currentPlaying
  );
  const playingList = useSelector((state) => state.nowPlayingList.playingList);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );
  function _spring() {
    updateState({ backClickCount: 1 });
    setTimeout(() => {
      updateState({ backClickCount: 0 });
    }, 1000);
  }

  const [state, setState] = useState({
    currentIndex: 1,
    pauseSong: true,
    backClickCount: 0,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const bottonNavigation = [
    {
      index: 1,
      icon: "music-note",
    },
    {
      index: 2,
      icon: "local-fire-department",
    },
    {
      index: 3,
      icon: "library-music",
    },
    {
      index: 4,
      icon: "supervised-user-circle",
    },
    {
      index: 5,
      icon: "camera-alt",
    },
    {
      index: 6,
      icon: "settings",
    },
  ];
  const { currentIndex, pauseSong, backClickCount } = state;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        {currentIndex == 1 ? (
          <ExploreScreen navigation={navigation} />
        ) : currentIndex == 2 ? (
          <TrendingScreen navigation={navigation} />
        ) : currentIndex == 3 ? (
          <LibraryScreen navigation={navigation} />
        ) : currentIndex == 4 ? (
          <ProfileScreen navigation={navigation} />
        ) : currentIndex == 5 ? (
          <IntroAIScreen navigation={navigation} />
        ) : (
          <SettingsScreen navigation={navigation} />
        )}
        {soundStatus.isSoundLoaded ? currentlyPlayedSong() : null}
        <View style={styles.bottomTabBarStyle}>
          {bottonNavigation.map((item) => bottomTabBarItem(item))}
        </View>
      </View>
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor12Medium }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function currentlyPlayedSong() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.push(Navigate.NOW_PLAYING, { item: { id: "image" } })
        }
        style={styles.currentlyPlayedSongInfoWrapStyle}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SharedElement id="image">
            <Image
              source={{ uri: playingList[currentAudioIndex]?.imageUrl }}
              style={{
                width: 55.0,
                height: 55.0,
                borderRadius: Sizes.fixPadding - 5.0,
              }}
            />
          </SharedElement>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text
              numberOfLines={1}
              style={{
                maxWidth: width / 3.0,
                ...Fonts.blackColor15Bold,
              }}
            >
              {playingList[currentAudioIndex]?.name}
            </Text>
            <Text style={{ ...Fonts.grayColor11Medium }}>
              {playingList[currentAudioIndex]?.artist}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.forwardBackwardButtonWrapStyle}>
            <MaterialIcons
              name="arrow-left"
              size={30}
              color="black"
              onPress={() => audioPlayer(ACTION_TYPE.PREV_SONG, index)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              !soundStatus?.isPlaying
                ? audioPlayer(ACTION_TYPE.START, 0)
                : audioPlayer(ACTION_TYPE.PAUSE, 0)
            }
            style={styles.pausePlayButtonWrapStyle}
          >
            <MaterialIcons
              name={soundStatus?.isPlaying ? "pause" : "play-arrow"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.forwardBackwardButtonWrapStyle}>
            <MaterialIcons
              name="arrow-right"
              size={30}
              color="black"
              onPress={() => audioPlayer(ACTION_TYPE.NEXT_SONG, Math.random())}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function bottomTabBarItem({ index, icon }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ alignItems: "center" }}
        onPress={() => updateState({ currentIndex: index })}
      >
        {index == currentIndex ? (
          <MaterialIcons
            size={35}
            mode="linear"
            color={Colors.secondaryColor}
            style={{ alignSelf: "center" }}
            name={icon}
            type="material"
          />
        ) : (
          <MaterialIcons
            color={Colors.blackColor}
            size={35}
            style={{ alignSelf: "center" }}
            name={icon}
          />
        )}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  bottomTabBarStyle: {
    position: "absolute",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30.0,
    borderTopColor: "#F2F2F2",
    borderTopWidth: 0.5,
    elevation: 2.0,
  },
  forwardBackwardButtonWrapStyle: {
    width: 35.0,
    backgroundColor: Colors.whiteColor,
    height: 35.0,
    borderRadius: 17.5,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  pausePlayButtonWrapStyle: {
    width: 45.0,
    height: 45.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: 22.5,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
  },
  currentlyPlayedSongInfoWrapStyle: {
    left: 0.0,
    right: 0.0,
    bottom: 60.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.5,
    shadowColor: Colors.grayColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabBarScreen;
