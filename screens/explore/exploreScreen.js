import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Menu, MenuItem } from "react-native-material-menu";
import { SharedElement } from "react-navigation-shared-element";
import { useGetPlaylist } from "../../hooks/playlist.hook";
import { useGetGenreList } from "../../hooks/genre.hook";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "../../constants/navigate";
import { useGetFavoriteGenreAPI } from "../../hooks/favorite.hook";
import {
  useGetAudioListAPI,
  useGetRecentlyPlayHistoryAudioListAPI,
} from "../../hooks/audio.hook";

let recentlyPlayedList = null;

let forYouList = [];

let topArtistList = [
  {
    id: "1a",
    image: require("../../assets/images/artist/artist1.png"),
    artistName: "Arijit Singh",
    songsCount: 179,
  },
  {
    id: "2a",
    image: require("../../assets/images/artist/artist2.png"),
    artistName: "Justin Biber",
    songsCount: 250,
  },
  {
    id: "3a",
    image: require("../../assets/images/artist/artist3.png"),
    artistName: "Lady Gaga",
    songsCount: 200,
  },
  {
    id: "4a",
    image: require("../../assets/images/artist/artist1.png"),
    artistName: "Arijit Singh",
    songsCount: 179,
  },
];
//top music

//Random playlist
const ExploreScreen = ({ navigation }) => {
  //Recommend gendre (if user finished their exam)
  const { data: recommendedGenre, isSuccess: isRecommendedGenreSucess } =
    useGetGenreList();

  //Recently played
  const {
    data: dataRecentlyPlay,
    isSuccess: isSuccessRecentlyPlay,
    isError: isErrorRecentlyPlay,
    error: errorRecentlyPlay,
  } = useGetRecentlyPlayHistoryAudioListAPI();
  if (isSuccessRecentlyPlay) {
    console.log("Get audio list successful");
  }
  if (isErrorRecentlyPlay) {
    console.log("Get audio list failed", errorRecentlyPlay);
  }

  //Recommend audio
  const {
    data: dataAudioList,
    isSuccess: isSuccessAudioList,
    isError: isErrorAudioList,
    error: errorAudioList,
  } = useGetAudioListAPI();
  if (isSuccessAudioList) {
    console.log("Get audio list successful");
  }
  if (isErrorAudioList) {
    console.log("Get audio list failed", errorAudioList);
  }
  //Favorited gendre (first time and user choose and user like gendre)
  const {
    data: dataFavGenre,
    isSuccess: isSuccessFavGenre,
    isError: isErrorFavGenre,
    error: errorFavGenre,
  } = useGetFavoriteGenreAPI();
  if (isSuccessFavGenre) {
    console.log("Get favorite genre successful");
  }
  if (isErrorFavGenre) {
    console.log("Get favorite genre failed", errorFavGenre);
  }
  //Favorited Playlist
  const { data: playListFavoritedData, isSuccess: isPlayListFavoritedSuccess } =
    useGetPlaylist({
      status: "ACTIVE",
      playListType: "LIKED",
      page: 1,
      limit: 10,
    });

  const { data: allPlayListData } = useGetPlaylist({
    status: "ACTIVE",
    page: 1,
    limit: 10,
  });

  //Random gendre
  const { data: allGendreData, isSuccess: isAllGendreSuccess } =
    useGetGenreList();

  const [state, setState] = useState({
    forYouData: forYouList,
    pauseSong: true,
    showOptions: false,
  });

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
          {popularSongsInfo()}
          {recentlyPlayedInfo()}
          {forYouInfo()}
          {playListInfo()}
          {albumsInfo()}
          {topArtistInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function topArtistInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("TopArtist", { item })}
      >
        <SharedElement id={item.id}>
          <Image source={item.image} style={styles.topArtistImageStyle} />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.artistName}
        </Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>
          {item.songsCount} songs
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Top Tracks</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        <FlatList
          data={topArtistList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function albumsInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("GenreTracks");
        }}
      >
        <SharedElement id={item.id}>
          <Image
            source={{ uri: `${item?.image}` }}
            style={styles.recentlyPlayedSongImageStyle}
          />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Genres</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isAllGendreSuccess ? (
          <FlatList
            data={allGendreData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
            }}
          />
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function playListInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("Tracks");
        }}
      >
        <SharedElement id={item.id}>
          <Image
            source={{ uri: `${item?.imageUrl}` }}
            style={styles.recentlyPlayedSongImageStyle}
          />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Favorited Playlist</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isPlayListFavoritedSuccess ? (
          <FlatList
            data={playListFavoritedData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
            }}
          />
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function forYouInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Favorited Genre</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isSuccessFavGenre ? (
          dataFavGenre?.map((item) => (
            <View key={`${item.id}`}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.push(Navigate.GENRE_PLAYLIST_SCREEN, {
                    genreId: item.genreId,
                  })
                }
                style={styles.forYouInfoWrapStyle}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SharedElement id={item?.genreId}>
                    <Image
                      source={{ uri: `${item.genre.image}` }}
                      style={{
                        width: 50.0,
                        height: 50.0,
                        borderRadius: Sizes.fixPadding - 5.0,
                      }}
                    />
                  </SharedElement>
                  <View style={{ marginLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.blackColor12SemiBold }}>
                      {item.genre.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function recentlyPlayedInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("NowPlaying", { item })}
      >
        <SharedElement id={item.id}>
          <Image
            source={{ uri: `${item.audio?.imageUrl}` }}
            style={styles.recentlyPlayedSongImageStyle}
          />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
            width: "90%",
          }}
        >
          {item.audio.name}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Recently Played</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {!dataRecentlyPlay ? (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        ) : (
          <FlatList
            data={dataRecentlyPlay}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
            }}
          />
        )}
      </View>
    );
  }

  function popularSongsInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("NowPlaying", { item })}
      >
        <SharedElement id={`${item.id}`}>
          <Image
            source={{ uri: `${item.imageUrl}` }}
            style={styles.popularSongImageStyle}
          />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.name}
        </Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>
          {item.artist.artist_name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Audios</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {!dataAudioList ? (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        ) : (
          <FlatList
            data={dataAudioList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
            }}
          />
        )}
      </View>
    );
  }

  function recommendedInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.push(Navigate.GENRE_PLAYLIST_SCREEN, {
            genreId: item.id,
          })
        }
      >
        <ImageBackground
          source={{ uri: `${item?.image}` }}
          style={{ width: 130.0, height: 120.0, marginRight: Sizes.fixPadding }}
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
          <Text style={styles.titleStyle}>Recommended Genres For You</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isRecommendedGenreSucess ? (
          <FlatList
            data={recommendedGenre}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
          />
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function searchBar() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("Search")}
        style={styles.searchBarWrapStyle}
      >
        <Text style={{ ...Fonts.grayColor15Medium }}>
          Search for artist or song...
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
          maskElement={<Text style={{ ...Fonts.bold22 }}>Explore</Text>}
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
          style={{ height: 150.0, backgroundColor: Colors.whiteColor }}
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
              updateState({ showOptions: false });
            }}
          >
            View By Album Artist
          </MenuItem>
          <MenuItem
            pressColor="transparent"
            textStyle={{
              marginRight: Sizes.fixPadding * 3.0,
              marginTop: Sizes.fixPadding - 40.0,
              ...Fonts.blackColor12SemiBold,
            }}
            onPress={() => {
              updateState({ showOptions: false });
            }}
          >
            Sound Quality and Effects
          </MenuItem>
          <MenuItem
            pressColor="transparent"
            textStyle={{
              marginRight: Sizes.fixPadding * 3.0,
              marginTop: Sizes.fixPadding - 70.0,
              ...Fonts.blackColor12SemiBold,
            }}
            onPress={() => {
              updateState({ showOptions: false });
            }}
          >
            Tracks
          </MenuItem>
          <MenuItem
            pressColor="transparent"
            textStyle={{
              marginRight: Sizes.fixPadding * 3.0,
              marginTop: Sizes.fixPadding - 100.0,
              ...Fonts.blackColor12SemiBold,
            }}
            onPress={() => {
              updateState({ showOptions: false });
            }}
          >
            Contact Us
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
  recentlyPlayedSongImageStyle: {
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
  },
});

export default ExploreScreen;
