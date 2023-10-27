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

interface StateData {
  secret: string;
  text: string;
  encrypted?: string;
}

export default function EncryptView() {
  const [data, setData] = useState<StateData>({
    secret: '',
    text: '',
    encrypted: undefined,
  });

  const handleEncrypt = async (t: string) => {
    if (data.secret.length === 16 && t !== '') {
      const res = await encrypt(t, data.secret);

      if (res) {
        setData((prev) => ({ ...prev, encrypted: res }));
      }
    } else {
      setData((prev) => ({ ...prev, encrypted: undefined }));
    }
  };

  const handleChange = (key: keyof StateData, value: string) => {
    setData({ ...data, [key]: value });
    handleEncrypt(value);
  };

  const handlePress = () => {
    if (data.encrypted !== undefined) {
      Clipboard.setString(data.encrypted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Encryption</Text>

      <View>
        <Text style={styles.label}>Secret key</Text>
        <TextInput
          value={data.secret}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          onChangeText={(value) => handleChange('secret', value)}
          style={styles.input}
          placeholder="Enter secret key"
          maxLength={16}
          multiline={false}
        />
      </View>

      <View>
        <Text style={styles.label}>Text to encrypt</Text>
        <TextInput
          value={data.text}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          onChangeText={(value) => handleChange('text', value)}
          style={styles.input}
          placeholder="Enter text to encrypt"
        />
      </View>

      {data.encrypted && (
        <View>
          <Text style={styles.label}>Encrypted Text</Text>
          <View style={styles.encryptedField}>
            <Text>{data.encrypted}</Text>

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
    // backgroundColor: 'red',
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
