import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { decrypt } from 'react-native-aes-gcm';
import { useAppContext } from '../context/app.context';
import type { AppStateAction } from '../context/types';

export default function DecryptView() {
  const { state, dispatch } = useAppContext();
  const [decrypted, setDecrypted] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleDecrypt = async (t: string) => {
    if (state.secret.length === 16 && t !== '') {
      const res = await decrypt(t, state.secret);

      if (res) {
        setDecrypted(res);
      }
    } else {
      setDecrypted('');
    }
  };

  const handlePress = () => {
    if (decrypted !== undefined) {
      Clipboard.setString(decrypted);
    }
  };

  const handleSecretChange = (value: string) => {
    const action: AppStateAction = {
      type: 'SET_SECRET',
      payload: {
        secret: value,
      },
    };

    handleDecrypt(text);
    dispatch(action);
  };

  const handleTextChange = (value: string) => {
    handleDecrypt(value);
    setText(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Decryption</Text>

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
        <Text style={styles.label}>Text to decrypt</Text>
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

      {decrypted && (
        <View>
          <Text style={styles.label}>Encrypted Text</Text>
          <View style={styles.encryptedField}>
            <Text>{decrypted}</Text>

            <TouchableOpacity onPress={handlePress} style={styles.btn}>
              <Text style={styles.btnText}>Copy Decrypted Text</Text>
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
  box: {
    width: 300,
    height: 60,
    marginVertical: 20,
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
