import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Menu, MenuItem } from "react-native-material-menu";
import { useGetPlaylist } from "../../hooks/playlist.hook";
import { useDispatch } from "react-redux";
import { playlistAction } from "../../redux/other/playlist.slice";
import { store } from "../../core/store/store";
import { Navigate } from "../../constants/navigate";

let forYouList = [];
let album = [
  {
    id: "1r",
    image: require("../../assets/images/songsCoverPicks/coverImage1.png"),
    category: "Morning chill",
  },
  {
    id: "2r",
    image: require("../../assets/images/songsCoverPicks/coverImage2.png"),
    category: "Daily Mix",
  },
  {
    id: "3r",
    image: require("../../assets/images/songsCoverPicks/coverImage3.png"),
    category: "Top Trending",
  },
  {
    id: "4r",
    image: require("../../assets/images/songsCoverPicks/coverImage4.png"),
    category: "Pop Music",
  },
];
let activeAlbum;
const ManageArtistAlbumScreen = ({ navigation }) => {
  const [state, setState] = useState({
    forYouData: forYouList,
    pauseSong: true,
    showOptions: false,
  });
  const { data, isSuccess, isError, error } = useGetPlaylist();

  const dispatch = useDispatch();
  const handlePlaylistPress = (playlistId) => {
    try {
      dispatch(playlistAction.setPlaylistId(playlistId));
      console.log("Playlist Id saved", store.getState().playlist.playlistId);
    } catch (error) {
      console.log("Error saving selected playlist ID", error);
    }
  };
  if (isSuccess) {
    album = data["data"].items;
    activeAlbum = album.filter((item) => item.status === "ACTIVE");
    dispatch(playlistAction.setActivePlaylist(activeAlbum));
  }
  if (isError) {
    console.log("error", error);
  }
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showOptions } = state;

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
          {searchBar()}
          {recommendedInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function recommendedInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          handlePlaylistPress(item.id), navigation.push(Navigate.ARTIST_TRACK);
        }}
      >
        <ImageBackground
          source={{ uri: `${item.imageUrl}` }}
          style={{
            width: 130.0,
            height: 120.0,
            marginTop: Sizes.fixPadding + 5.0,
            marginRight: Sizes.fixPadding,
          }}
          borderRadius={Sizes.fixPadding - 5.0}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,0.5)", "rgba(41, 10, 89, 0.5)"]}
            style={{ flex: 1, borderRadius: Sizes.fixPadding - 5.0 }}
          >
            <Text
              style={{
                padding: Sizes.fixPadding - 5.0,
                ...Fonts.whiteColor12Medium,
              }}
            >
              {item.name}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );

    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Album List</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        <FlatList
          data={activeAlbum}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 1.5 }}
        />
      </View>
    );
  }

  function searchBar() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push(Navigate.SEARCH)}
        style={styles.searchBarWrapStyle}
      >
        <Text style={{ ...Fonts.grayColor15Medium }}>
          Search for artist,song or lyrics...
        </Text>
        <MaterialIcons name="search" color={Colors.grayColor} size={25} />
      </TouchableOpacity>
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

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Manage Album</Text>}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <Menu
          visible={showOptions}
          style={{ backgroundColor: Colors.whiteColor }}
          anchor={
            <MaterialIcons
              name="more-vert"
              size={24}
              color={Colors.blackColor}
              style={{ alignSelf: "flex-end" }}
              onPress={() => updateState({ showOptions: true })}
            />
          }
          onRequestClose={() => updateState({ showOptions: false })}
        >
          <MenuItem
            pressColor="transparent"
            textStyle={{
              marginRight: Sizes.fixPadding * 3.0,
              ...Fonts.blackColor12SemiBold,
            }}
            onPress={() => {
              updateState({ showOptions: false }),
                navigation.push(Navigate.CREATE_ALBUM);
            }}
          >
            Add New Album
          </MenuItem>
          <MenuItem
            pressColor="transparent"
            textStyle={{
              marginRight: Sizes.fixPadding * 3.0,
              ...Fonts.blackColor12SemiBold,
            }}
            onPress={() => {
              updateState({ showOptions: false }),
                navigation.push(Navigate.DELETE_ALBUM_ARTIST);
            }}
          >
            Delete Album
          </MenuItem>
          <MenuItem
            pressColor="transparent"
            textStyle={{
              marginRight: Sizes.fixPadding * 3.0,
              ...Fonts.blackColor12SemiBold,
            }}
            onPress={() => {
              updateState({ showOptions: false }),
                navigation.push("editAlbumArtistScreen");
            }}
          >
            Edit Album
          </MenuItem>
        </Menu>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 30.0,
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
});

export default ManageArtistAlbumScreen;
