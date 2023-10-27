#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AesGcm, NSObject)

RCT_EXTERN_METHOD(encrypt:(NSString *)text secretKey:(NSString *)secret resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(decrypt:(NSString *)text secretKey:(NSString *)secret resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
