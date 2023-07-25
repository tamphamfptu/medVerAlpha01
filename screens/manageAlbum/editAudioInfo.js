import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateAudioArtistAPI } from "../../hooks/playlistTracks.hook";

const EditAudioArtistScreen = ({ navigation }) => {
  const audio = useSelector((state) => state.audioArtist);
  let audioInfo = audio.audioInfo;
  const [state, setState] = useState({
    name: null,
    description: null,
    pauseSong: true,
    showOptions: false,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const { name, description } = state;
  const { mutate } = useUpdateAudioArtistAPI();

  const dispatch = useDispatch();

  const { showOptions } = state;

  const handleUpdateAudio = () => {
    mutate(
      {
        name: state.name,
      },
      {
        onSuccess: (data) => {
          const dataRaw = data["data"];
          console.log("Update Success", dataRaw);
          navigation.pop();
        },
        onError: (error) => {
          console.log("Error when updating Album Info", error);
        },
      }
    );
  };
  function updateButton() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={styles.updateButtonStyle}
          activeOpacity={0.9}
          onPressIn={() => {
            handleUpdateAudio();
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.updateButtonGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>Update</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={styles.updateButtonStyle}
          activeOpacity={0.9}
          onPressIn={() => {
            navigation.pop();
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.updateButtonGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>Cancel</Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }

  const showAudioInfo = () => {
    return (
      <View style={styles.centeredView}>
        {audioInfo && (
          <View style={styles.modalView}>
            <View>
              <Text>Input new informations</Text>
            </View>
            <Image
              style={{ width: 130.0, height: 120.0, marginTop: 20 }}
              source={{ uri: `${audioInfo.imageUrl}` }}
            />
            <View style={{ justifyContent: "center" }}>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ marginTop: 21 }}>
                  <Text>Name:</Text>
                </View>
                <View>
                  <TextInput
                    value={name}
                    onChangeText={(text) => updateState({ name: text })}
                    selectionColor={Colors.grayColor}
                    placeholder={audioInfo.name}
                    placeholderTextColor={Colors.grayColor}
                    style={styles.input}
                  />
                </View>
              </View>
              {updateButton()}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          {cornerImage()}
          {header()}
          {showAudioInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

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
            navigation.pop();
          }}
          style={{ width: 30 }}
          name="left"
          size={27}
          color="black"
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={
            <Text style={{ ...Fonts.bold22 }}>Choose Album to edit</Text>
          }
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
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginTop: Sizes.fixPadding - 40.0,
  },
  searchBarWrapStyle: {
    backgroundColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding * 2.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor15Bold,
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  popularSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  recentlyPalyedSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  forYouInfoWrapStyle: {
    marginBottom: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playListImageStyle: {
    alignSelf: "center",
    height: 100,
    borderWidth: 2.0,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  albumImageWrapStyle: {
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    borderWidth: 2.0,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  topArtistImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 50,
    paddingHorizontal: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  updateButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  updateButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default EditAudioArtistScreen;
