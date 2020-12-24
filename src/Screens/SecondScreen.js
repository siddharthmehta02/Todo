import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../firebase/config";
import { Header } from 'react-navigation-stack';
import { useHeaderHeight } from 'react-navigation-stack';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from "react-native";

export default function SecondScreen({ navigation }) {
    const docName = navigation.getParam('docName')
    console.log(docName.Title)
    const [list, setList] = useState([]);
    const [counter, setCounter] = useState()
    const [newInput, setNewInput] = useState();
    const [arr, setArr] = useState();
    const title = firebase.firestore().collection("ToDoProperStructure").doc(docName).collection("Todos");

    const addToList = (newItem) => {
        console.log(title.get())
        title.doc(newItem).set({
            Title: newItem
        });
        display();
    };


    const display = () => {
        title.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            setList(data);
            console.log(data);
        });
    }


    const deleteTodo = (del) => {
        title.doc(del.Title).delete().then(() => {
            console.log(del.Title);
            display();
        });

    }


    if (!counter) {
        display();
        setCounter("Displayed")
    }


    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.flatlist_view}>
                    <FlatList
                        style={styles.flatlist}
                        data={list}
                        keyExtractor={list.id}
                        showsHorizontalScrollIndicator={false}


                        renderItem={({ item }) => {
                            return (
                                <View style={styles.display_cover}>
                                    <View style={styles.display}>
                                        <Text style={styles.text}>{item.Title}</Text>
                                        <TouchableOpacity onPress={() => deleteTodo(item)}>
                                            <AntDesign name="delete" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            );
                        }}
                    />
                </View>
                <View style={styles.input}>

                    <TextInput
                        style={styles.inputBar}
                        textAlign={'center'}
                        placeholder="Let's Go!"
                        onChangeText={(input) => setNewInput(input)}
                        clearTextOnFocus={true}
                        enablesReturnKeyAutomatically={true}
                    />
                    <TouchableOpacity onPress={() => addToList(newInput)}>
                        <FontAwesome name="arrow-circle-right" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    flatlist_view: {

        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 40,
        height: Dimensions.get('window').height - 50,
    },
    
    display: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: "#e94560",
        marginTop: 10,
        height: 50,
        borderRadius: 10

    },
    inputBar: {
        width: "100%",
        backgroundColor: "#16213e",
        borderRadius: 10,
        textAlign: "center",
        color: "white",
        flex: 100,
        height: "100%"



    },
    input: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        // paddingTop: 10,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,

        height: 30,
        marginBottom: 10,
        flex: 1,
        backgroundColor: "#1a1a2e"
    },
    container: {
        // height: "100%",
        backgroundColor: "#1a1a2e"

    },
    text: {
        color: "white",
        width: "70%"
    },
    flatlist: {
        //     height: Dimensions.get('window').height - 45,
        marginBottom: 10


    }
});