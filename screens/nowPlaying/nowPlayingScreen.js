import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Icon } from "react-native-gradient-icon";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTION_TYPE,
  nowPlayingAction,
} from "../../redux/audio/nowPlayingList.slice";

const NowPlayingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentAudioIndex, soundStatus } = useSelector(
    (state) => state.nowPlayingList.currentPlaying
  );
  const playingList = useSelector((state) => state.nowPlayingList.playingList);
  const audioPlayer = (audioAction, audioActionVaue) => {
    dispatch(
      nowPlayingAction.triggerAudioPlayer({
        audioAction: audioAction,
        audioActionVaue: audioActionVaue,
      })
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
        >
          {cornerImage()}
          {header()}
          {songInfo()}
          {nextOnTheLists()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function nextOnTheLists() {
    return (
      <View>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            marginBottom: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor15Bold,
          }}
        >
          Tracks list
        </Text>
        {playingList.map((item, index) => (
          <View key={item.id}>
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => {
                audioPlayer(ACTION_TYPE.PLAY_SONG_INDEX, index);
              }}
              style={styles.nextOnTheListInfoWrapStyle}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    width: 50.0,
                    height: 50.0,
                    borderRadius: Sizes.fixPadding - 5.0,
                  }}
                />
                <View style={{ marginLeft: Sizes.fixPadding }}>
                  <Text style={{ ...Fonts.blackColor12SemiBold }}>
                    {item.name}
                  </Text>
                  <Text style={{ ...Fonts.grayColor10Medium }}>
                    {item.artist}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  function songInfo() {
    return (
      <View>
        {songNameWithPoster()}
        {songTimeInfo()}
        {songProcessSlider()}
        {songPlayInfo()}
        {favoriteShuffleAndRepeatInfo()}
        {lyricsTextWithIcon()}
      </View>
    );
  }

  function lyricsTextWithIcon() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MaterialIcons
          name="keyboard-arrow-up"
          size={20}
          color={Colors.blackColor}
        />
        <Text style={{ ...Fonts.grayColor10SemiBold }}>Lyrics</Text>
      </View>
    );
  }

  function favoriteShuffleAndRepeatInfo() {
    return (
      <View style={styles.favoriteShuffleAndRepeatInfoWrapStyle}>
        <MaterialIcons name="repeat" size={20} color="black" />
        <TouchableOpacity activeOpacity={0.9} style={{}}>
          {playingList[currentAudioIndex]?.isLoved ? (
            <Icon
              size={18}
              mode="linear"
              colors={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
              style={{
                marginHorizontal: Sizes.fixPadding * 4.0,
                alignSelf: "center",
              }}
              name="favorite"
              type="material"
            />
          ) : (
            <MaterialIcons
              name="favorite-border"
              size={18}
              style={{
                marginHorizontal: Sizes.fixPadding * 4.0,
                alignSelf: "center",
              }}
              color="rgba(255, 124, 0,1)"
            />
          )}
        </TouchableOpacity>
        <MaterialIcons name="shuffle" size={20} color="black" />
      </View>
    );
  }

  function songPlayInfo() {
    return (
      <View style={styles.songPlayInfoWrapStyle}>
        <MaterialIcons
          name="replay-10"
          size={25}
          style={{ marginRight: Sizes.fixPadding * 2.0 }}
          color="black"
          onPress={() => audioPlayer(ACTION_TYPE.MINOR_10_SEC, Math.random())}
        />
        <View style={styles.forwardBackwardButtonWrapStyle}>
          <MaterialIcons
            name="arrow-left"
            size={30}
            color="black"
            onPress={() => audioPlayer(ACTION_TYPE.PREV_SONG, Math.random())}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            soundStatus.isPlaying
              ? audioPlayer(ACTION_TYPE.PAUSE, 0)
              : audioPlayer(ACTION_TYPE.START, 0)
          }
        >
          <LinearGradient
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.pausePlayButtonWrapStyle}
          >
            <MaterialIcons
              name={!soundStatus.isPlaying ? "play-arrow" : "pause"}
              color={Colors.whiteColor}
              size={25}
            />
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.forwardBackwardButtonWrapStyle}>
          <MaterialIcons
            name="arrow-right"
            size={30}
            color="black"
            onPress={() => audioPlayer(ACTION_TYPE.NEXT_SONG, Math.random())}
          />
        </View>
        <MaterialIcons
          name="forward-10"
          size={25}
          color="black"
          style={{ marginLeft: Sizes.fixPadding * 2.0 }}
          onPress={() => audioPlayer(ACTION_TYPE.ADD_10_SEC, Math.random())}
        />
      </View>
    );
  }

  function songNameWithPoster() {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: playingList[currentAudioIndex]?.imageUrl || {} }}
          style={{
            marginVertical: Sizes.fixPadding,
            width: 190.0,
            height: 210.0,
            borderRadius: Sizes.fixPadding - 5.0,
          }}
        />
        <Text style={{ ...Fonts.blackColor14Bold }}>
          {playingList[currentAudioIndex]?.name || "loading..."}
        </Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>
          {playingList[currentAudioIndex]?.artist || "loading"}
        </Text>
      </View>
    );
  }

  function songProcessSlider() {
    return (
      <View style={styles.songProcessSliderWrapStyle}>
        <Slider
          value={soundStatus.songRunningInPercentage || 0}
          onValueChange={(value) =>
            audioPlayer(ACTION_TYPE.CHANGE_SONG_TIMELINE, value)
          }
          maximumValue={100}
          minimumValue={0}
          style={{ height: 12.0 }}
          minimumTrackTintColor={Colors.primaryColor}
          maximumTrackTintColor={Colors.secondaryColor}
          thumbTintColor={Colors.secondaryColor}
          trackStyle={{ height: 4.5, backgroundColor: Colors.primaryColor }}
          thumbStyle={{
            height: 15,
            width: 15,
            backgroundColor: Colors.primaryColor,
          }}
        />
      </View>
    );
  }

  function songTimeInfo() {
    return (
      <View style={styles.songTimeInfoWrapStyle}>
        <Text style={{ ...Fonts.grayColor10Medium }}>0:00</Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>
          {soundStatus.durationMillis
            ? (soundStatus.durationMillis / 60000).toFixed(2)
            : "loading..."}
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.pop()}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            colors={[
              { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
              { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
            ]}
            style={{
              marginRight: Sizes.fixPadding - 5.0,
              marginTop: Sizes.fixPadding - 5.0,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Now Playing</Text>}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>
    );
  }

  function cornerImage() {
    return (
      <View>
        <Image
          source={require("../../assets/images/corner-design.png")}
          style={{
            width: "100%",
            height: 170,
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 40.0,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  songTimeInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "space-between",
    marginTop: Sizes.fixPadding + 5.0,
  },
  songProcessSliderWrapStyle: {
    flex: 1,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "stretch",
    justifyContent: "center",
  },
  forwardBackwardButtonWrapStyle: {
    width: 30.0,
    backgroundColor: Colors.whiteColor,
    height: 30.0,
    borderRadius: 15.0,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  pausePlayButtonWrapStyle: {
    width: 37.0,
    height: 37.0,
    borderRadius: 18.5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding + 2.0,
  },
  favoriteShuffleAndRepeatInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  songPlayInfoWrapStyle: {
    marginTop: Sizes.fixPadding + 10.0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nextOnTheListInfoWrapStyle: {
    marginBottom: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default NowPlayingScreen;
