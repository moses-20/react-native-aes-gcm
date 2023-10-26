import CryptoKit

@available(iOS 13.0, *)
@objc(AesGcm)
class AesGcm: NSObject {
    private var GCM_IV_LENGTH = 12
    private var GCM_TAG_LENGTH = 16
    private var ENCODE_REQUEST_SECRET = "8ctOzuQwtGl?.9gX"
    
    @objc
    func multiply(_ a: Float, withB b: Float, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        resolve(a * b)
    }
    
    @objc
    func encrypt(_ text: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let iv = try AES.GCM.Nonce(data: Data(count: GCM_IV_LENGTH))
            let key = SymmetricKey(data: Data(ENCODE_REQUEST_SECRET.utf8))
            
            let sealedBox = try AES.GCM.seal(
                Data(text.utf8),
                using: key,
                nonce: iv,
                authenticating: Data(count: GCM_TAG_LENGTH)
            )
            
            let result = sealedBox.combined!.base64EncodedString()
            
            resolve(result)
        } catch {
            reject("5000", "Encryption failed", error)
        }
    }
}
