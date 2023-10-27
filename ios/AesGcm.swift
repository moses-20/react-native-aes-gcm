import CryptoKit

@available(iOS 13.0, *)
@objc(AesGcm)
class AesGcm: NSObject {
    
    @objc
    func encrypt(_ text: String, secretKey secret: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let nonce = AES.GCM.Nonce.init()
            
            let key = SymmetricKey(data: Data(secret.utf8))
            
            let sealedBox = try AES.GCM.seal(
                Data(text.utf8),
                using: key,
                nonce: nonce
            )
            
            resolve(sealedBox.combined!.base64EncodedString())
        } catch {
            reject("Encryption Failed", "Make sure the secret key 16 characters long", error)
        }
    }

    @objc
    func decrypt(_ text: String, secretKey secret: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let key = SymmetricKey(data: Data(secret.utf8))
            
            let sealedBox = try AES.GCM.SealedBox.init(combined: Data(base64Encoded: text)!)
            
            let decrypted = try AES.GCM.open(sealedBox, using: key)
            
            resolve(String(data: decrypted, encoding: .utf8))
        } catch {
            reject("Decryption Failed", "Make sure the secret key 16 characters long", error)
        }
    }
}
