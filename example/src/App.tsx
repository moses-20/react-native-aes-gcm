import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { encrypt, multiply } from 'react-native-aes-gcm';

const data = JSON.stringify({
  msisdn: '+233240695050',
});

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const [encrypted, setEncrypted] = React.useState<string | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  React.useEffect(() => {
    encrypt(data).then((res) => {
      setEncrypted(res);
      console.log('ENCODED: ', res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {JSON.stringify(result)}</Text>
      <Text>Result: {JSON.stringify(encrypted)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
