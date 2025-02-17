// Firebase Setup
import { FIREBASE_DB, FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, addDoc, updateDoc, getDoc, setDoc } from "firebase/firestore";

class UserModel{
    // name: string;
    // email: string;
    // password: string;
    db: Object;
    auth: Object;

    /**
     * 
     * @param name User's name
     * @param email User's email
     * @param password User's password
     */
    /*constructor(name: string, email: string, password: string){
        this.name = name;
        this.email= email;
        this.password= password;
    }*/

   constructor(){
    this.db = FIREBASE_DB;
    this.auth = FIREBASE_AUTH;
   }

    /**
     * Registers a new user into the database.
     * 
     * @param name User's name
     * @param email User's email
     * @param password User's password
     */
    async registerUser(name: string, email: string, password: string) {
        const auth = FIREBASE_AUTH;

        // Debugging
        console.log("registerUser function triggered!");
        console.log(FIREBASE_DB); // Ensure firestore instance initialization

        try {
            // Add email and password to Firebase Authentication
            const response = await createUserWithEmailAndPassword(auth, email, password); 
            console.log(response); // Debugging
            
            // Add name, email and password to Firestore DB
            const userDocRef = doc(FIREBASE_DB, "users", email);
            
            await setDoc(userDocRef, { 
            name: name,
            email: email,
            password: password,
            pet: {
              petType: 0,
              petName: "",
              // Initial stats
              health: 100, // Pet is at full health initially
              mood: 1, // Pet is happy initially 
              //* NOTE: Pet has three possible states: Happy = 1, Neutral = 2, Sad = 3
            },
            tasks:[]
          });
          console.log("Document written with ID: ", email); // Debugging
        } catch (error) {
          console.error("Error adding document: ", error); // Debugging
          alert('Registration Failed');
        }
      }

      /**
       * Get the user's data in a specified field.
       * @param userEmail User's email
       * @param fieldName Name of the field whose data is being fetched.
       * @returns 
       */
      async getUserDataByField(userEmail: string, fieldName: string){
        const userDocRef = doc(FIREBASE_DB, "users", userEmail);
       
        try {
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()){
          const userData = userDocSnap.data();
          console.log("Fetched user data:", userData);


          if (userData.pet && typeof userData.pet === "object") {
                const petType = userData.pet.petType;
                console.log("PETTYPE IS:", petType);
                return petType;
            } else {
              console.log("Pet field is missing or not an object.");
              return null; 
            }

        } else {         
            console.log(`User document (${userEmail}) not found.`);
            return null;
        }
      } catch (error: any){
        console.error("Error fetching document: ", error);
        return null;
        }
      };

      //* NOTE: If (petType = 0), the application will prompt the user to select a pet. 
      async choosePet(userEmail: string, petType: number, petName: string){
        // Debugging
        console.log("choosePet function triggered!");
        console.log(FIREBASE_DB); // Ensure firestore instance initialization

        try {
            // Add petType and petName to Firestore DB
            const docRef = await updateDoc(doc(FIREBASE_DB, "users", userEmail), { 
            pet: {
              petType: petType,
              petName: petName,
              // Initial stats
              health: 100, // Pet is at full health initially
              mood: 1, // Pet is happy initially 
              //* NOTE: Pet has three possible states: Happy = 1, Neutral = 2, Sad = 3
            }
          });
          console.log("Updating doc: "); // Debugging
        } catch (error) {
          console.error("Error updating document: ", error); // Debugging
          alert('Choose Pet Failed');
        }
      }

      async loginUser(email: string, password: string){
        const auth = FIREBASE_AUTH;

        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error : any){
            console.log(error);
            alert('Invalid email or password');
            // alert('login failed: ' + error.message); // debugging
          }
      }


    //! TRY USING THIS
    // import * as React from 'react';
    // import { Text } from 'react-native';
    // import auth from '@react-native-firebase/auth';
    
    // function App() {
    //   const user = auth().currentUser;
    
    //   return <Text>Welcome {user.email}</Text>;
    // }
    
    // export default App;
}

export default UserModel;