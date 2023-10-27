import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-aes-gcm' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AesGcm = NativeModules.AesGcm
  ? NativeModules.AesGcm
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

interface AesGcmInterface {
  encrypt(text: string, key: string): Promise<string>;
  decrypt(text: string, key: string): Promise<string>;
}

export default AesGcm as AesGcmInterface;
