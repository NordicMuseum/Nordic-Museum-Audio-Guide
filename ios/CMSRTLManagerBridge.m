//
//  CMSRTLManagerBridge.swift
//  AndyWarholAccessibilityProject
//
//  Created by Sam Ticknor on 5/4/17.
//  Copyright © 2017 Carnegie Museums of Pittsburgh Innovation Studio.
//  All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(CMSRTLManager)

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXTERN_METHOD(setRTL:bool rtl
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
