import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t}from"./framework-CXnKph_e.js";var n=e(t(),1),r=`(function () {
  'use strict';
  if (!/^(www\\.)?infinityhub\\.it$/.test(location.hostname) || window.self !== window.top || window.__yAnalyticsInstalled) return;
  window.__yAnalyticsInstalled = true;
  var id = 'G-FDLV537XLQ', loaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window['ga-disable-' + id] = true;
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  function preference(prefs) {
    var allowed = !!(prefs && prefs.purposes && prefs.purposes['4'] === true);
    window['ga-disable-' + id] = !allowed;
    window.gtag('consent', 'update', { analytics_storage: allowed ? 'granted' : 'denied',
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    if (!allowed || loaded) return;
    loaded = true;
    window.gtag('js', new Date());
    window.gtag('config', id, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(ga);
  }
  window._iub = window._iub || [];
  var config = window._iub.csConfiguration = window._iub.csConfiguration || {
    perPurposeConsent: true, siteId: 3050090, whitelabel: false,
    cookiePolicyId: 95585144, lang: 'it',
    banner: { acceptButtonColor: '#75AECE', acceptButtonDisplay: true,
      backgroundColor: '#604E4E', closeButtonRejects: true,
      customizeButtonCaptionColor: '#604E4E', customizeButtonColor: '#FFFFFF',
      customizeButtonDisplay: true, explicitWithdrawal: true,
      listPurposes: true, position: 'float-bottom-center' }
  };
  // Use explicit basic consent: no Google script or requests before purpose 4.
  config.googleConsentMode = false;
  config.callback = config.callback || {};
  var previous = config.callback.onPreferenceExpressedOrNotNeeded;
  config.callback.onPreferenceExpressedOrNotNeeded = function (prefs) {
    preference(prefs);
    if (typeof previous === 'function') previous.apply(this, arguments);
  };
  var cmp = document.createElement('script');
  cmp.async = true;
  cmp.charset = 'UTF-8';
  cmp.src = 'https://cdn.iubenda.com/cs/iubenda_cs.js';
  document.head.appendChild(cmp);
  function preferencesLink() {
    if (document.getElementById('y-cookie-preferences')) return;
    var link = document.createElement('a');
    link.id = 'y-cookie-preferences';
    link.className = 'iubenda-cs-preferences-link';
    link.href = 'https://www.iubenda.com/privacy-policy/95585144/cookie-policy';
    link.textContent = 'Preferenze cookie';
    var footer = document.querySelector('footer .y-footer-links:last-of-type') || document.querySelector('footer');
    if (footer) footer.appendChild(link);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', preferencesLink, { once: true });
  else preferencesLink();
})();`;function i(){return(0,n.useEffect)(()=>{if(document.getElementById(`y-consent-analytics`))return;let e=document.createElement(`script`);e.id=`y-consent-analytics`,e.textContent=r,document.head.appendChild(e)},[]),null}export{i as default};