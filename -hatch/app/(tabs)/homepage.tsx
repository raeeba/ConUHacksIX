import { Text, View, StyleSheet, TouchableOpacity, Alert, Button, FlatList } from "react-native";
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// HomePage
const HomePage = () =>{
  const router = useRouter();
  const [username, setUsername] = useState('');  
  const [petname, setPetname] = useState(''); 
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userdata = await AsyncStorage.getItem('user');
        if (userdata) {
          const user = JSON.parse(userdata);
          setTasks(user.tasks || []);
          setUsername(user.name); 
          setPetname(user.pet.name);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     
  
      {/* Wrap multiple <Text> elements inside a View or Fragment */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {username ? (
          <>
            <Text>Welcome, {username}!</Text>
            <Text>Say Hi to your pet, {petname}</Text>
          </>
        ) : (
          <Text>Welcome, guest!</Text>
        )}
      </View>
  
      {/* Logout Button */}
      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem("username"); // Clear stored user name
          await AsyncStorage.removeItem("user"); // Also clear stored user data
          Alert.alert("Logged out");
        }}
      />
  
      {/* Chatbot Navigation Button */}
      <TouchableOpacity onPress={() => router.push("/ChatScreen")}>
        <Text>Go to the Chatbot</Text>
      </TouchableOpacity>
    </View>
  );
  
}

export default HomePage;
