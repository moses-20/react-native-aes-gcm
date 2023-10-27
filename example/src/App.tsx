import React from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EncryptView from './views/encrypt';
import DecryptView from './views/decrypt';
import { AppContextProvider, useAppContext } from './context/app.context';
import type { AppStateAction } from './context/types';

function AppView() {
  const { state, dispatch } = useAppContext();

  const handlePress = () => {
    const action: AppStateAction = {
      type: 'SET_VIEW',
      payload: {
        view: state.view === 'encrypt' ? 'decrypt' : 'encrypt',
      },
    };

    dispatch(action);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.header}>React Native AES GCM</Text>
        <Pressable style={styles.btn} onPress={handlePress}>
          <Text style={styles.btnText}>Switch</Text>
        </Pressable>

        {state.view === 'encrypt' ? <EncryptView /> : <DecryptView />}
      </KeyboardAvoidingView>
    </View>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <AppView />
    </AppContextProvider>
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
    textAlign: 'center',
  },
  btn: {
    // display: 'none',
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
