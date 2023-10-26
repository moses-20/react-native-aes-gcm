package com.aesgcm

import com.facebook.react.bridge.*
import java.security.SecureRandom
import javax.crypto.Cipher
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec
import java.util.Base64

private const val GCM_IV_LENGTH = 12
private const val GCM_TAG_LENGTH = 16
private const val ENCODE_REQUEST_SECRET = "8ctOzuQwtGl?.9gX"

class AesGcmModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  @ReactMethod
  fun encrypt(plainText: String, promise: Promise) {
    try {
      val iv = ByteArray(GCM_IV_LENGTH)
      SecureRandom().nextBytes(iv)

      val cipher = Cipher.getInstance("AES/GCM/NoPadding")
      cipher.init(
        Cipher.ENCRYPT_MODE,
        SecretKeySpec(ENCODE_REQUEST_SECRET.toByteArray(), "AES"),
        GCMParameterSpec(GCM_TAG_LENGTH * 8, iv)
      )

      val ciphertext = cipher.doFinal(plainText.toByteArray(Charsets.UTF_8))

      val encrypted = ByteArray(iv.size + ciphertext.size + GCM_TAG_LENGTH)
      System.arraycopy(iv, 0, encrypted, 0, iv.size)
      System.arraycopy(ciphertext, 0, encrypted, iv.size, ciphertext.size)
      System.arraycopy(cipher.iv, 0, encrypted, iv.size + ciphertext.size, GCM_TAG_LENGTH)

      val result = encrypted.encodeBase64()

      promise.resolve(result)
    } catch (error: Exception) {
      promise.reject(error)
    }
  }

  private fun ByteArray.encodeBase64(): String {
    return Base64.getEncoder().encodeToString(this)
  }

  companion object {
    const val NAME = "AesGcm"
  }
}
