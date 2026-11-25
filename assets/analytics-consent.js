(function () {
  'use strict';

  var storageKey = 'ccai_analytics_consent';
  var banner;

  function readChoice() {
    try {
      var choice = window.localStorage.getItem(storageKey);
      return choice === 'granted' || choice === 'denied' ? choice : null;
    } catch (error) {
      return null;
    }
  }

  function storeChoice(choice) {
    try {
      window.localStorage.setItem(storageKey, choice);
    } catch (error) {
      // Consent still applies for this page when storage is unavailable.
    }
  }

  function updateConsent(choice) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: choice
      });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ccai_consent_update',
      analytics_consent: choice
    });
  }

  function closeBanner() {
    if (banner) {
      banner.hidden = true;
    }
  }

  function setConsent(choice) {
    storeChoice(choice);
    updateConsent(choice);
    closeBanner();
  }

  function buildBanner() {
    if (banner) {
      return banner;
    }

    banner = document.createElement('section');
    banner.className = 'analytics-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'analytics-consent-title');
    banner.setAttribute('aria-describedby', 'analytics-consent-description');
    banner.innerHTML = '<h2 id="analytics-consent-title">Analytics choice</h2>' +
      '<p id="analytics-consent-description">Coffee Cup AI uses optional Google Analytics to understand website use. Advertising storage stays off. See the <a href="/privacy/">privacy note</a>.</p>' +
      '<div class="analytics-consent__actions">' +
      '<button type="button" data-consent="granted">Accept analytics</button>' +
      '<button type="button" data-consent="denied">Decline</button>' +
      '</div>';

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-consent]');
      if (button) {
        setConsent(button.getAttribute('data-consent'));
      }
    });

    document.body.appendChild(banner);
    return banner;
  }

  function openSettings() {
    var currentBanner = buildBanner();
    currentBanner.hidden = false;
    var firstButton = currentBanner.querySelector('button');
    if (firstButton) {
      firstButton.focus();
    }
  }

  function initialize() {
    document.querySelectorAll('[data-analytics-settings]').forEach(function (button) {
      button.addEventListener('click', openSettings);
    });
    if (!readChoice()) {
      openSettings();
    }
  }

  window.CoffeeCupAnalytics = {
    getConsent: readChoice,
    open: openSettings,
    setConsent: setConsent
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
}());
