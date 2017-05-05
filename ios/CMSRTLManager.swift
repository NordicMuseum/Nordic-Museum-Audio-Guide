//
//  CMSRTLManager.swift
//  AndyWarholAccessibilityProject
//
//  Created by Sam Ticknor on 5/4/17.
//  Copyright © 2017 Carnegie Museums of Pittsburgh Innovation Studio.
//  All rights reserved.
//

import Foundation

@objc(CMSRTLManager)
class CMSRTLManager: NSObject {
  
  @objc func setRTL(rtl: bool,
                    resolve:@escaping RCTPromiseResolveBlock,
                    reject:@escaping RCTPromiseRejectBlock) {

    if true {
        resolve(nil)
        return
    } else {
        reject("Beacon Scanning failed", "uuidString is invalid", nil);
        return
    }
  }

}
