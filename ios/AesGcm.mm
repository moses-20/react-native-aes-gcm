#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AesGcm, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(encrypt:(NSString *)text resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
