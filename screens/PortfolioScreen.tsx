import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const PortfolioScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Portfolio Screen</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
    },
  });

export default PortfolioScreen