import GoogleAnalytics from 'react-native-google-analytics-bridge';

// *** No State Changes Actions ***

// Screen Analytics
export function analyticsTrackScreen(screenName) {
  GoogleAnalytics.trackScreenView(screenName);
}

// Content Analytics
export function analyticsTrackLanguageSelected(locale) {
  GoogleAnalytics.trackEvent('Language', 'Language Selected', { label: locale });
}

export function analyticsTrackContentOpened(tourStop) {
  GoogleAnalytics.trackEvent('Content', 'Opened', { label: tourStop });
}

export function analyticsTrackAudioCompleteListen(tourStop, contentTitle) {
  GoogleAnalytics.trackEvent('Content', 'Complete Listen', {
    label: `${tourStop} - ${contentTitle}`,
  });
}

export function analyticsTrackAudioPartialListen(tourStop, contentTitle, percentageListened) {
  GoogleAnalytics.trackEvent('Content', 'Partial Listen', {
    label: `${tourStop} - ${contentTitle}`,
    value: Math.round(percentageListened * 100),
  });
}

// Beacon Analytics
export function analyticsTrackBeaconRegion(regions, locale) {
  GoogleAnalytics.trackEvent('Beacon', `RegionsDetected - ${locale}`, { label: regions });
}

// Device Analytics
// WARNING: This goes by if 'always show tutorial is on', which is a pretty error
// prone way to get this data
export function analyticsTrackDeviceType(isGuest) {
  GoogleAnalytics.trackEvent('Device', 'Type', { label: isGuest ? 'Guest' : 'Museum' });
}

export function analyticsTrackDeviceAutoPlay(autoPlayOn) {
  GoogleAnalytics.trackEvent('Device', 'AutoPlayStatus', { label: autoPlayOn ? 'On' : 'Off' });
}

// Accessibility Analytics
export function analyticsTrackScreenReaderStatus(ScreenReaderStatus) {
  GoogleAnalytics.trackEvent('Accessibility', 'ScreenReaderStatus', {
    label: ScreenReaderStatus ? 'On' : 'Off',
  });
}

export function analyticsTrackTranscriptOpenned(tourStop, contentTitle) {
  GoogleAnalytics.trackEvent('Accessibility', 'TranscriptOpenned', {
    label: `${tourStop} - ${contentTitle}`,
  });
}
