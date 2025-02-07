import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';

// HomePage
const HomePage = () =>{
  const router = useRouter();


    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Edit app/homepage.tsx to edit this .</Text>
          <TouchableOpacity onPress={()=> router.push("/ChatScreen")  }>
            <Text>Go to the Chatbot</Text>
          </TouchableOpacity>
        </View>
      );
}

export default HomePage;
