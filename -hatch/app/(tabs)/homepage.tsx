import { Text, View, StyleSheet, TouchableOpacity, Alert, Button, FlatList, Image } from "react-native";
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel  from '../../models/userModel';

// HomePage
const HomePage = () =>{
  const router = useRouter();
  const [username, setUsername] = useState('');  
  const [petname, setPetname] = useState(''); 
  const [petType, setPetType] = useState(''); 
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
          setPetType(user.pet.type);
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
  
       <TouchableOpacity onPress={() =>  router.push("/ChatScreen")}>
          <Image source={require('../../assets/images/char_sakura.png')} style={styles.charImage} />
      </TouchableOpacity>

       <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem("username"); 
          await AsyncStorage.removeItem("user");
          Alert.alert("Logged out");
        }}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7e9", 
  },
  startButton: {
    alignItems: "center",
  },
  buttonImage: {
    width: 160, 
    height: 75, 
  },
  charContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  charImage: {
    width: 170,
    height: 170,
    marginHorizontal: 10, 
  },
});

export default HomePage;
