import React, { useState, createRef } from "react";
import { SafeAreaView, ScrollView, TextInput, StatusBar, View, StyleSheet, Text, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const searchHistoryList = [
    {
        id: '1',
        search: 'Leave Me Lonely',
        searchType: 'Song',
    },
    {
        id: '2',
        search: 'Party Rock Anthem',
        searchType: 'Song',
    },
    {
        id: '3',
        search: 'Rim Jhim Gire Savan',
        searchType: 'Song',
    },
];

const SearchScreen = ({ navigation }) => {

    const [state, setState] = useState({
        search: '',
        searchHistoryData: searchHistoryList,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        search,
        searchHistoryData,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
                >
                    {cornerImage()}
                    {searchField()}
                    {searchHistoryInfo()}
                    {divider()}
                    {clearHistoryText()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function clearHistoryText() {
        return (
            <Text
                onPress={() => removeSearchAllItems()}
                style={{ textAlign: 'center', ...Fonts.blackColor15Bold }}>
                Clear history
            </Text>
        )
    }

    function removeSearchAllItems() {
        updateState({ searchHistoryData: [] })
    }

    function divider() {
        return (
            <View style={{
                marginVertical: Sizes.fixPadding + 5.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.lightGrayColor,
                height: 1.0,
            }} />
        )
    }

    function removeFromSearch({ id }) {
        const newList = searchHistoryData.filter((item) => item.id != id);
        updateState({ searchHistoryData: newList })
    }

    function searchHistoryInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Bold }}>
                    Search history
                </Text>
                {
                    searchHistoryData.length != 0
                        ?
                        searchHistoryData.map((item) => (
                            <View key={`${item.id}`}>
                                <View style={styles.searchInfoWrapStyle}>
                                    <View>
                                        <Text style={{ ...Fonts.blackColor13SemiBold }}>
                                            {item.search}
                                        </Text>
                                        <Text style={{ ...Fonts.grayColor10SemiBold }}>
                                            {item.searchType}
                                        </Text>
                                    </View>
                                    <MaterialIcons
                                        name="close"
                                        color={Colors.grayColor}
                                        size={20}
                                        onPress={() => removeFromSearch({ id: item.id })}
                                    />
                                </View>
                            </View>
                        ))
                        :
                        <Text style={{ textAlign: 'center', ...Fonts.grayColor13SemiBold }}>
                            History is Clear
                        </Text>
                }
            </View>
        )
    }

    function searchField() {
        const textInputRef = createRef();
        return (
            <View style={styles.searchFieldWrapStyle}>
                <TextInput
                    ref={textInputRef}
                    selectionColor={Colors.grayColor}
                    style={{ ...Fonts.grayColor15Medium, flex: 1, }}
                    value={search}
                    placeholder="Search for artist,song or lyrics..."
                    placeholderTextColor={Colors.grayColor}
                    onChangeText={(text) => updateState({ search: text })}
                />
                <MaterialIcons
                    name="search"
                    color={Colors.grayColor}
                    size={25}
                    onPress={() => textInputRef.current.focus()}
                />
            </View>
        )
    }

    function cornerImage() {
        return (
            <View>
                <Image
                    source={require('../../assets/images/corner-design.png')}
                    style={{
                        width: '100%',
                        height: 170,
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        borderRadius: Sizes.fixPadding * 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding - 30.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
    },
    searchInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0,
    }
})

export default SearchScreen;