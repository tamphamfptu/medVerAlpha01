import React, { useState, useCallback } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  StatusBar,
  TextInput,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useFocusEffect } from "@react-navigation/native";
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useCreateAudioForArtistAPI } from "../../hooks/playlistTracks.hook";
import { store } from "../../core/store/store";
import { Navigate } from "../../constants/navigate";

const CreateAudioArtistScreen = ({ navigation }) => {
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

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

  const { mutate } = useCreateAudioForArtistAPI();
  const handleCreateAudio = () => {
    mutate(
      {
        name: state["audioName"],
        imageUrl: state["imageUrl"],
        status: "ACTIVE",
        length: state["length"],
        playlistId: [store.getState().playlist.playlistId],
        genreId: store.getState().genreArtist.genreArtistId,
      },

      {
        onSuccess: (data) => {
          if (data !== null) {
            navigation.push(Navigate.ARTIST_TRACK);
          }
        },
        onError: (error) => {
          alert("Some errors happened please try again later");
          console.log("error", error);
        },
      }
    );
  };

  const [state, setState] = useState({
    audioName: null,
    imageUrl: null,
    length: null,
    backClickCount: 0,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const { audioName, imageUrl, length, backClickCount } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {albumInfo()}
          </ScrollView>
        </ScrollView>
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

  function albumInfo() {
    return (
      <View>
        <MaskedView
          style={{ flex: 1, height: 35 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold30 }}>
              Audio Info
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        {audioNameTextField()}
        {audioImageUrlTextField()}
        {audioLengthTextField()}
        {addButton()}
      </View>
    );
  }

  function addButton() {
    return (
      <View>
        <Pressable
          style={styles.signinButtonStyle}
          activeOpacity={0.9}
          onPressIn={() => {
            handleCreateAudio();
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.signinButtonGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>Add</Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }

  function audioNameTextField() {
    return (
      <View style={styles.albumNameTextFieldWrapStyle}>
        <Ionicons name="albums" color={Colors.grayColor} size={20} />
        <TextInput
          value={audioName}
          onChangeText={(text) => updateState({ audioName: text })}
          selectionColor={Colors.grayColor}
          placeholder="Audio Name"
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function audioImageUrlTextField() {
    return (
      <View style={styles.imageUrlTextFieldWrapStyle}>
        <FontAwesome name="image" color={Colors.grayColor} size={20} />
        <TextInput
          value={imageUrl}
          onChangeText={(text) => updateState({ imageUrl: text })}
          selectionColor={Colors.grayColor}
          placeholder="Image Url"
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function audioLengthTextField() {
    return (
      <View style={styles.descriptionTextFieldWrapStyle}>
        <MaterialIcons name="description" color={Colors.grayColor} size={20} />
        <TextInput
          value={length}
          onChangeText={(text) => updateState({ length: text })}
          selectionColor={Colors.grayColor}
          placeholder="Length"
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
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
        <AntDesign
          onPress={() => {
            navigation.push(Navigate.ARTIST_TRACK);
          }}
          style={{ width: 30 }}
          name="left"
          size={27}
          color="black"
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
  albumNameTextFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding * 2.5,
    marginBottom: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  imageUrlTextFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding * 2.5,
    marginBottom: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  descriptionTextFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding * 2.5,
    marginBottom: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },

  orWrapStyle: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },

  signinButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signinButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default CreateAudioArtistScreen;
