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
#import "RCTI18nUtil.h"
#import "RCTRootView.h"
#import "AppDelegate.h"


@interface RCT_EXTERN_MODULE(CMSRTLManager, NSObject)

RCT_EXTERN_METHOD(forceRTL:(BOOL) rtl)

@end
