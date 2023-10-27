import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { encrypt } from 'react-native-aes-gcm';
import { useAppContext } from '../context/app.context';
import type { AppStateAction } from '../context/types';

export default function EncryptView() {
  const { state, dispatch } = useAppContext();
  const [encrypted, setEncrypted] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleEncrypt = async (t: string) => {
    if (state.secret.length === 16 && t !== '') {
      const res = await encrypt(t, state.secret);

      if (res) {
        setEncrypted(res);
      }
    } else {
      setEncrypted('');
    }
  };

  const handlePress = () => {
    if (encrypted !== undefined) {
      Clipboard.setString(encrypted);
    }
  };

  const handleSecretChange = (value: string) => {
    const action: AppStateAction = {
      type: 'SET_SECRET',
      payload: {
        secret: value,
      },
    };

    handleEncrypt(text);
    dispatch(action);
  };

  const handleTextChange = (value: string) => {
    handleEncrypt(value);
    setText(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Encryption</Text>

      <View>
        <Text style={styles.label}>Secret key</Text>
        <TextInput
          value={state.secret}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          onChange={({ nativeEvent }) => handleSecretChange(nativeEvent.text)}
          // onChangeText={handleSecretChange}
          style={styles.input}
          placeholder="Enter secret key"
          maxLength={16}
          multiline={false}
        />
      </View>

      <View>
        <Text style={styles.label}>Text to encrypt</Text>
        <TextInput
          value={text}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          onChange={({ nativeEvent }) => handleTextChange(nativeEvent.text)}
          // onChangeText={handleTextChange}
          style={styles.input}
          placeholder="Enter text to encrypt"
        />
      </View>

      {encrypted && (
        <View>
          <Text style={styles.label}>Encrypted Text</Text>
          <View style={styles.encryptedField}>
            <Text>{encrypted}</Text>

            <TouchableOpacity onPress={handlePress} style={styles.btn}>
              <Text style={styles.btnText}>Copy Encrypted Text</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: 320,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  encryptedField: {
    width: 320,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dotted',
  },
  btn: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    marginTop: 20,
    textAlign: 'center',
    cursor: 'pointer',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
