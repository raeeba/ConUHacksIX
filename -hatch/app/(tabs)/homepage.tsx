import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState, useRef } from 'react';
import PetLife from "../petLife";
import Petchar from "../petchar";

// HomePage
const HomePage = () =>{


    return (
      <ImageBackground
          source={require('../../../-hatch/assets/images/backhome.png')}
          style={styles.background}
          resizeMode="cover"
          >    
            <PetLife lifeNumber={20} />
            <Petchar characterType="2" mood="sad" />
          </ImageBackground>
      );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomePage;
