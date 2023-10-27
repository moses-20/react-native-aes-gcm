import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import EncryptView from './views/encrypt';

export default function App() {
  const [encrypt, setEncrypt] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> React Native AES GCM </Text>
      <Pressable style={styles.btn} onPress={() => setEncrypt(!encrypt)}>
        <Text style={styles.btnText}>Switch</Text>
      </Pressable>
      <EncryptView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  header: {
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 20,
  },
  btn: {
    display: 'none',
    width: 320,
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
    textAlign: 'center',
    cursor: 'pointer',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
