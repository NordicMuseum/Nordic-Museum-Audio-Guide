import EventEmitter from 'EventEmitter';

class LocalizationActor {
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;
    this._emitter = new EventEmitter();

    this._eventName = 'appChangedLocale';
  }

  changedLocaleEvent = locale => {
    this._emitter.emit(this._eventName, locale);
  };

  addListener = listener => {
    this._emitter.addListener(this._eventName, listener);
  };

  removeListener = listener => {
    this._emitter.removeListener(this._eventName, listener);
  };
}

let _localizationActor;
export const localizationActor = store => {
  if (_localizationActor) {
    return _localizationActor;
  }

  _localizationActor = new LocalizationActor(store);
  return _localizationActor;
};
