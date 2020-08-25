import React, {Component} from 'react';
import { Platform, NativeModules } from 'react-native';

export const Languages = {
        bottomBarSettings: {
            en: 'Settings',
            es: 'Configuración'
        },
        bottomBarCreators: {
            en: 'Search',
            es: 'Buscar'
        },
        Username: {
            en: 'Username',
            es: 'Usuario'
        }
    };

export const getLang = function () {
  let locale: string;
  // iOS
  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }


  if (typeof locale === 'undefined') {
    __DEV__ && console.log('Couldnt get locale');
    return 'en';
  }

  if(locale.includes("en")){
    return 'en';
  } else if(locale.includes("es")){
    return 'es'
  } else {
    return 'en';
  }
  //console.log("is eglish", locale.includes("en"), locale.includes("es"))

  return locale;
}

export const getLangString = function () {
  let locale: string;
  // iOS
  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (typeof locale === 'undefined') {
    __DEV__ && console.log('Couldnt get locale');
    return 'English';
  }

  if(locale.includes("en")){
    return 'English';
  } else if(locale.includes("es")){
    return 'Español'
  } else {
    return 'English';
  }
  //console.log("is eglish", locale.includes("en"), locale.includes("es"))

  return locale;
}

export const arrayLanguages = {
  "ES":"Español",
  "EN":"English"
}