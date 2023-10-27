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

interface StateData {
  secret: string;
  text: string;
  decrypted?: string;
}

export default function DecryptView() {
  const [data, setData] = useState<StateData>({
    secret: '',
    text: '',
    decrypted: undefined,
  });

  const handleDecrypt = async () => {
    if (data.secret.length === 16 && data.text !== '') {
      const res = await decrypt(data.text, data.secret);

      if (res) {
        setData((prev) => ({ ...prev, decrypted: res }));
      }
    } else {
      setData((prev) => ({ ...prev, decrypted: undefined }));
    }
  };

  const handleChange = (key: keyof StateData, value: string) => {
    setData({ ...data, [key]: value });
    handleDecrypt();
  };

  const handlePress = () => {
    if (data.decrypted !== undefined) {
      Clipboard.setString(data.decrypted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Decryption </Text>

      <View>
        <Text style={styles.label}>Secret Key</Text>
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
        <Text style={styles.label}>Text to decrypt</Text>
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

      {data.decrypted && (
        <View>
          <Text style={styles.label}>Encrypted Text</Text>
          <View style={styles.encryptedField}>
            <Text>{data.decrypted}</Text>

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
    width: 300,
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
    width: 300,
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
