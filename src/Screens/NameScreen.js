import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { firebase } from '../firebase/config'
import { FontAwesome } from '@expo/vector-icons';

export default function NameScreen({navigation}) {
    const [name,setName]=useState()
    const firebaseController = firebase.firestore().collection("ToDoProperStructure")
    const createData = () => {
    //     firebaseController.where('Title','!=',name).get().then((doc) =>{
    //             firebaseController.doc(name).set({
    //                 Title: name
    //             });
    //             console.log("created")
    //         }
    // ).catch(()=>{
    //     console.log("BSDK WAPAS DAAL")
    // })
        firebaseController.doc(name).set({
            Title: name,
        });
        console.log("created");
        navigation.navigate("Second",{docName:name})
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.input}>
            <TextInput
                style={styles.inputBar}
                defaultValue="Enter Title"
                onChangeText={(text)=>setName(text)}
                clearTextOnFocus
                    enablesReturnKeyAutomatically={true}
            />
           
            <TouchableOpacity  onPress={()=>createData()}>
                <FontAwesome name="arrow-circle-right" size={30} color="white" />
            </TouchableOpacity>
            </View>
        </View>
    )
    
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#1a1a2e',
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      inputBar:{
        
        backgroundColor:"#16213e",
        borderRadius:10,
        textAlign:"center",
        color:"white",
        flex:1
        
        
    },
    input:{
        flexDirection:"row",
        width:"80%"
    }
})
