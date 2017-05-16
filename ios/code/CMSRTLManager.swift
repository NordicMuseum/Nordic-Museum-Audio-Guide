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
  
  @objc func setRTL(_ rtl: Bool,
                    resolver resolve: RCTPromiseResolveBlock,
                    rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    let appDelegate  = UIApplication.shared.delegate // as! AppDelegate
    // let view = appDelegate?.window!?.rootViewController?.view // as! YourViewController
    
    RCTI18nUtil.sharedInstance()

    if (rtl == true) {
      // print("setting to true because");
      UIView.appearance().semanticContentAttribute = .forceRightToLeft
      (RCTI18nUtil.sharedInstance() as AnyObject).forceRTL(true)
      //view?.setNeedsLayout()
      //view?.layoutSubviews()
      //view?.layoutIfNeeded()
      resolve(true);
    } else {
      // print("setting to false because");
      UIView.appearance().semanticContentAttribute = .forceLeftToRight
      (RCTI18nUtil.sharedInstance() as AnyObject).forceRTL(false)
      //view?.setNeedsLayout()
      //view?.layoutSubviews()
      //view?.layoutIfNeeded()
      resolve(false);
    }
  }

}
