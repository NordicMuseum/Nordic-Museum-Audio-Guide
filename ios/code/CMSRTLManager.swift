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
  @objc func forceRTL(_ rtl: Bool) -> Void {

    if (rtl == true) {
      UIView.appearance().semanticContentAttribute = .forceRightToLeft
      UINavigationBar.appearance().semanticContentAttribute = .forceRightToLeft
    } else {
      UIView.appearance().semanticContentAttribute = .forceLeftToRight
      UINavigationBar.appearance().semanticContentAttribute = .forceLeftToRight
    }
    
    // !WARNING! This is bound to break as it's imported from "RCTBridge+Private.h"
    RCTBridge.current().reload()
  }
}
