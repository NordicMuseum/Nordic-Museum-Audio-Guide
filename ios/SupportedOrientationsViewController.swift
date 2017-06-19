//
//  SupportedOrientationsViewController.swift
//  AndyWarholAccessibilityProject
//
//  Created by Ruben Niculcea on 6/19/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import UIKit

class SupportedOrientationsViewController: UIViewController {
  override var shouldAutorotate: Bool {
    return true
  }
  
  override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
    return .all
  }
}
