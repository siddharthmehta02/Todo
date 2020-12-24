import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../firebase/config";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Header } from "react-navigation-stack";
import { Feather } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const title = firebase.firestore().collection("ToDoProperStructure")
  const [counter, setCounter] = useState();
  const [list, setList] = useState()

  const display = () => {
    title.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setList(data);
      console.log(data);
    });
  };

  if (!counter) {
    display();
    setCounter("Displayed");
  }

  // console.log(title.get());
  console.warn(Dimensions.get('window').width)
  return (
    // <SafeAreaView>

    <KeyboardAwareScrollView>
      <StatusBar hidden />
      <SafeAreaView>
        <View style={styles.final_cover}>
          <View style={styles.container}>
            <View style={styles.flatlist_cover}>
              <FlatList
                // showsVerticalScrollIndicator={true}
                columnWrapperStyle={styles.flex_cover}
                numColumns={2}
                data={list}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Second", { docName: item.Title })
                      }
                    >
                      <View style={styles.box}>
                        <Text>{item.Title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
    // </SafeAreaView>
  );
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: <TouchableOpacity onPress={() => navigation.navigate("Name")} >
      <Feather name="plus" size={24} color="white" style={{ paddingRight: 20 }} />
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#e94560',

    height: 160,
    width: 160,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 1
  },
  flatlist_cover: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  flex_cover: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",

  },
  container: {
    height: "100%",
    backgroundColor: "#1a1a2e"
  },
});
