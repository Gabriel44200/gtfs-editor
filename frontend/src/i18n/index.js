import messages from './messages';

const getLangFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang');
};

export const initReactIntl = () => {
  let locale = getLangFromUrl() || localStorage.getItem('locale') ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language || navigator.userLanguage || 'en';

  const localeWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];
  const localeMessages = messages[locale] || 
      messages[localeWithoutRegionCode] || messages['en'];

  localStorage.setItem('locale', locale);

  locale = localeMessages === messages['en'] ? 'en' : locale;

  return {locale, messages: localeMessages};
}

