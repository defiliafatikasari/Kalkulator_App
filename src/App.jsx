import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Kalkulator from './screen/Kalkulator';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Kalkulator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App;
