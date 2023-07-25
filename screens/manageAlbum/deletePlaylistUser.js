import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {
  useDeletePlaylistAPI,
  useGetPlaylist,
} from "../../hooks/playlist.hook";
import { useDispatch } from "react-redux";
import { playlistAction } from "../../redux/other/playlist.slice";
import { AntDesign } from "@expo/vector-icons";
import { store } from "../../core/store/store";
import { getUserFromDb } from "../../utils/app.util";
import { Navigate } from "../../constants/navigate";

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
const DeletePlayListUser = ({ navigation }) => {
  const userId = getUserFromDb().id;
  const { data, isSuccess, isError, error } = useGetPlaylist();
  const dispatch = useDispatch();
  const { mutate } = useDeletePlaylistAPI();
  if (isSuccess) {
    album = data["data"].items.filter(
      (item) => item.status === "ACTIVE" && item.authorId === userId
    );
  }
  if (isError) {
    console.log("error", error);
  }

  const [albumList, setAlbumList] = useState([]);
  useEffect(() => {
    setAlbumList(album);
  }, []);

  function updateAlbum() {
    const playlistId = store.getState().playlist.playlistId;
    const updateAlbum = albumList.filter((item) => item.id !== playlistId);
    setAlbumList(updateAlbum);
  }

  const deleteAlbum = () => {
    mutate({
      onSuccess: (data) => {},
      onError: (error) => {
        alert("Some errors happened please try again later");
        console.log("error", error);
      },
    });
    updateAlbum();
  };

  const showConfirmDialog = () => {
    return Alert.alert("Are your sure?", "Do you want to delete this album", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: async () => {
          deleteAlbum();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
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
          dispatch(playlistAction.setPlaylistId(item.id));
          showConfirmDialog();
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
        <FlatList
          data={albumList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: Sizes.fixPadding * 2.0,
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
            navigation.push(Navigate.BOTTOM_TAB_BAR);
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
            <Text style={{ ...Fonts.bold22, justifyContent: "center" }}>
              Select Playlist to delete
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
      </View>
    );
  }
};
const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 6.5,
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

export default DeletePlayListUser;
