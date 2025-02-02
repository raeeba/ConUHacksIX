import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { View as ProgressBar } from "react-native";

interface PetLifeProps {
  lifeNumber: number;
}

export default function PetLife({ lifeNumber }: PetLifeProps) {
  return (
    <View style={styles.container}>
      {lifeNumber === 100 ? (
        <Image
          source={require('../assets/images/fullheart.png')}
          style={styles.heartIcon}
        />

      ) : lifeNumber === 80 ? ( 
        <Image 
        source={require('../assets/images/80heart.png')}
        style={styles.heartIcon}
        />
      ) : lifeNumber === 60 ? (
        <Image 
        source={require('../assets/images/60heart.png')}
        style={styles.heartIcon}
        />
      ) : lifeNumber === 40 ? (
        <Image 
        source={require('../assets/images/40heart.png')}
        style={styles.heartIcon}
        />
      ) : lifeNumber === 20 ? (
        <Image 
        source={require('../assets/images/20heart.png')}
        style={styles.heartIcon}
        />
      ) : lifeNumber === 0 ? (
        <Image 
        source={require('../assets/images/00heart.png')}
        style={styles.heartIcon}
        />
      ) : (

        <View style={styles.gaugeContainer}>
          <View style={[styles.gauge, { width: `${lifeNumber}%` }]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20, 
  },
  heartIcon: {
    width: 300, 
    height: 150,
  },
  gaugeContainer: {
    width: 100,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  gauge: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
});