import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import { Navigate } from "../../constants/navigate";
import { useGetPlaylisByGenreIdApi } from "../../hooks/playlist.hook";
import { SimpleLineIcons } from "@expo/vector-icons";

let totalPlaylist;
const sortOptions = ["Name", "Date Added", "Artist"];

const PlaylistGenreScreen = ({ navigation, route }) => {
  const genreId = route.params.genreId;

  const {
    data: dataGetPlaylistByGenreId,
    isSuccess: isSuccessGetPlaylistByGenreId,
    isError: isErrorGetPlaylistByGenreId,
    error: errorGetPlaylistByGenreId,
  } = useGetPlaylisByGenreIdApi(genreId);
  const handleOptionSelect = (option) => {
    switch (option) {
      case "Share":
        console.log("Share option selected");
        break;
      case "Track Details":
        setIsModalVisible(true);
        break;
      case "Add to Playlist":
        console.log("Add to playlist option selected");
        break;
      case "Album":
        console.log("Album option selected");
        break;
      case "Artist":
        console.log("Artist option selected");
        break;
      case "Set as":
        console.log("Set as option selected");
        break;
      default:
        console.log("Invalid option selected");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const genreInfo = () => {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View style={{ paddingVertical: 12, marginLeft: 8 }}>
                <Image
                  source={{
                    uri: dataGetPlaylistByGenreId?.image,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "450",
                  }}
                >
                  {dataGetPlaylistByGenreId?.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    fontWeight: "200",
                  }}
                >
                  {dataGetPlaylistByGenreId?.desc}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "35%",
                }}
              >
                <SimpleLineIcons
                  name="playlist"
                  size={14}
                  color="black"
                  style={{ marginTop: 4 }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "300",
                    marginLeft: 6,
                  }}
                >
                  {dataGetPlaylistByGenreId["playlist"]
                    ? dataGetPlaylistByGenreId["playlist"].length
                    : "0"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const genrePlaylist = () => {
    return (
      <View style={{ backgroundColor: "#eeeeee", borderRadius: 10 }}>
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            {dataGetPlaylistByGenreId["playlist"]?.map(
              (playListInfor, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.push(Navigate.PLAYLIST_AUDIO_SCREEN, {
                        playlistId: playListInfor.id,
                      })
                    }
                  >
                    <View
                      style={{
                        borderColor: "grey",
                        paddingHorizontal: 8,
                        paddingVertical: 12,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Text>{index + 1}</Text>
                      </View>
                      <View style={{ marginLeft: 8 }}>
                        <Image
                          source={{ uri: playListInfor.imageUrl }}
                          style={styles.imagePlaylist}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          marginLeft: 10,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "400" }}>
                            {playListInfor.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              marginTop: 2,
                              fontWeight: "200",
                              color: "#808080",
                              fontStyle: "italic",
                            }}
                          >
                            {playListInfor["author"]["lastName"] || "Unknow"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      {isSuccessGetPlaylistByGenreId ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
          >
            {cornerImage()}
            {header()}
            {genreInfo()}
            {genrePlaylist()}
          </ScrollView>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
          >
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
            maskElement={<Text style={{ ...Fonts.bold22 }}>Playlist</Text>}
          >
            <LinearGradient
              start={{ x: 1, y: 0.2 }}
              end={{ x: 1, y: 1 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>
        <MaterialIcons
          name="search"
          size={20}
          style={{ alignSelf: "flex-end" }}
          onPress={() => navigation.push(Navigate.SEARCH)}
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 40.0,
    justifyContent: "space-between",
  },
  musicIconWrapStyle: {
    width: 35.0,
    height: 35.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  tracksInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },
  sortingOptionsWrapStyle: {
    paddingTop: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    width: 190.0,
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
    position: "absolute",
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
    backgroundColor: Colors.whiteColor,
    elevation: 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  imagePlaylist: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 40,
    height: 269.0,
    alignSelf: "center",
    position: "absolute",
    left: 0.0,
    right: 0.0,
    bottom: "30%",
    elevation: 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: 22.5,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    marginHorizontal: Sizes.fixPadding + 5.0,
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 0,
  },
  headerSubtext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
});

export default PlaylistGenreScreen;
