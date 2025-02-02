import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ImageBackground
    source={{ uri: '../../-hatch/assets/images/backhome.png' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});