//
//  SupportedOrientationsViewController.m
//  AndyWarholAccessibilityProject
//
//  Created by ruben.niculcea on 3/28/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "SupportedOrientationsViewController.h"

@interface SupportedOrientationsViewController ()

@end

@implementation SupportedOrientationsViewController

- (BOOL)shouldAutorotate {
  return true;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
  return UIInterfaceOrientationMaskAll;
}

@end
