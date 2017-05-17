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
    let appDelegate  = UIApplication.shared.delegate as! AppDelegate

    if (rtl == true) {
      UIView.appearance().semanticContentAttribute = .forceRightToLeft
      UINavigationBar.appearance().semanticContentAttribute = .forceRightToLeft
    } else {
      UIView.appearance().semanticContentAttribute = .forceLeftToRight
      UINavigationBar.appearance().semanticContentAttribute = .forceLeftToRight
    }
    
    mainThread {
      appDelegate.forceReload()
    }
  }
  
  func mainThread(_ closure:@escaping () -> ()) {
    DispatchQueue.main.async {
      closure()
    }
  }

}
