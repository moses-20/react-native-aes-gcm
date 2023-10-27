package com.aesgcm

import com.facebook.react.bridge.*
import java.security.SecureRandom
import javax.crypto.Cipher
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec
import java.util.Base64

private const val GCM_IV_LENGTH = 12
private const val GCM_TAG_LENGTH = 16

class AesGcmModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun encrypt(text: String, secret: String, promise: Promise) {
    try {
      val iv = ByteArray(GCM_IV_LENGTH)
      SecureRandom().nextBytes(iv)

      val cipher = Cipher.getInstance("AES/GCM/NoPadding")

      cipher.init(
        Cipher.ENCRYPT_MODE,
        SecretKeySpec(secret.toByteArray(), "AES"),
        GCMParameterSpec(GCM_TAG_LENGTH * 8, iv)
      )

      val ciphertext = cipher.doFinal(text.toByteArray(Charsets.UTF_8))

      val encrypted = ByteArray(iv.size + ciphertext.size)

      System.arraycopy(iv, 0, encrypted, 0, iv.size)
      System.arraycopy(ciphertext, 0, encrypted, iv.size, ciphertext.size)

      val result = encrypted.encodeBase64()

      promise.resolve(result)
    } catch (error: Exception) {
      promise.reject(error)
    }
  }

  @ReactMethod
  fun decrypt(text: String, secret: String, promise: Promise) {
    try {
      val decoded: ByteArray = text.decodeBase64()

      val iv: ByteArray = decoded.copyOfRange(0, GCM_IV_LENGTH)

      val cipher: Cipher = Cipher.getInstance("AES/GCM/NoPadding")

      cipher.init(
        Cipher.DECRYPT_MODE,
        SecretKeySpec(secret.toByteArray(), "AES"),
        GCMParameterSpec(GCM_TAG_LENGTH * 8, iv)
      )

      val ciphertext: ByteArray = cipher.doFinal(
        decoded,
        GCM_IV_LENGTH,
        decoded.size - GCM_IV_LENGTH
      )

      val decrypted = String(ciphertext, Charsets.UTF_8)

      promise.resolve(decrypted)
    } catch (error: Exception) {
      promise.reject(error)
    }
  }

  private fun ByteArray.encodeBase64(): String {
    return Base64.getEncoder().encodeToString(this)
  }

  private fun String.decodeBase64(): ByteArray {
    return Base64.getDecoder().decode(this)
  }

  companion object {
    const val NAME = "AesGcm"
  }
}
