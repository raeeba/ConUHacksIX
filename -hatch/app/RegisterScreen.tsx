import { useState } from "react"; 
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image, ImageBackground, ActivityIndicator} from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import UserModel from '../models/userModel';

// Firebase Setup
import { FIREBASE_DB, FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

let petType = 0;
let petName = "";

const RegisterScreen = () => {
  const router = useRouter(); // To navigate to character selection screen
  // User information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Pet information set by user
  //const [petType, setPetType] = useState(0);
  //const [petName, setPetName] = useState("");

  // Create user model 
  const [user] = useState(new UserModel());

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);

  //* NOTE: Don't put comments {/* */} in the return() function!
  //* Doing so might give you the following error: "Text strings must be rendered in <Text> component."
  return (
    <ImageBackground source={require('../assets/images/login-bg-30.png')}  style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo}/> 
          <TextInput 
            style={styles.input} 
            placeholder="what's your name?" 
            placeholderTextColor={styles.input.color}
            value={name} 
            onChangeText={setName}
          />
          <TextInput 
            style={styles.input} 
            placeholder="what's your email address?" 
            placeholderTextColor={styles.input.color}
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input} 
            placeholder="what's your password?" 
            placeholderTextColor={styles.input.color}
            value={password} 
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={async () => {
                try{
                  await user.registerUser(name, email, password);
                  const userPetType = await user.getUserDataByField(email, "pet");

                  console.log("User pet type:", userPetType);  

                  if (userPetType !== null && userPetType !== undefined){

                    if (userPetType === 0){
                      router.push("/CharSelectScreen");
                    } else {
                      console.log("Error fetching pet type.")
                      alert("Error fetching pet type."+ userPetType);
                    }
                  } else {
                    console.log("Error fetching pet type in registration undefined. petType: "+ petType);
                    alert("Error fetching pet type in registration undefined. petType: "+ petType);
                  }
                } catch (error){
                  console.error("Error occurred during registration.")
                }
              }
            }>
              <Image source={require('../assets/images/register_button.png')} style={styles.buttonImage}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Image source={require('../assets/images/back-button.png')} style={styles.buttonImage}/>
          </TouchableOpacity>

        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#e0f7e9", 
    backgroundColor: "#e0f7e0", 
  },*/
  background: {
    justifyContent: "center", 
    alignItems: "center",
    flex: 1
  },
  container: {
    padding: 20
  },
  logo: {
    width: 320,
    height: 100
  },
  input: {
    width: 300,
    height: 40,
    borderBottomWidth: 2, 
    borderColor: '#bb6f7c',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    paddingLeft: 10,              
    fontSize: 16,                 
    color: '#bb6f7c',                
    marginVertical: 10,
    backgroundColor: '#BEDABE'
  },
  button: {
    alignItems: "center",
  },
  buttonImage: {
    width: 175, 
    height: 75, 
  },
});

export default RegisterScreen;

