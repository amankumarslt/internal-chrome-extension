document.addEventListener('DOMContentLoaded', function() {
  const orgIdInput = document.getElementById('orgId');
  const orgSearchBtn = document.getElementById('orgSearch');
  const emailInput = document.getElementById('email');
  const emailSearchBtn = document.getElementById('emailSearch');

  const auteurTestIdInput = document.getElementById('auteurTestId');
  const auteurSearchBtn = document.getElementById('auteurSearch');

  const kaneTestIdInput = document.getElementById('kaneTestId');
  const kaneSearchBtn = document.getElementById('kaneSearch');

  const mobileTestIdInput = document.getElementById('mobileTestId');
  const mobileSearchBtn = document.getElementById('mobileSearch');

  const webTestIdInput = document.getElementById('webTestId');
  const webSearchBtn = document.getElementById('webSearch');

  // Auto search for org when 7 digits
  orgIdInput.addEventListener('input', function() {
    const value = orgIdInput.value;
    if (value.length === 7 && !isNaN(Number(value))) {
      const url = `https://backend-app.lambdatest.com/resources/organizations/${value}`;
      chrome.tabs.create({ url: url });
    }
  });

  // Manual org search
  orgSearchBtn.addEventListener('click', function() {
    const orgId = orgIdInput.value;
    if (orgId && !isNaN(Number(orgId))) {
      const url = `https://backend-app.lambdatest.com/resources/organizations/${orgId}`;
      chrome.tabs.create({ url: url });
    }
  });

  // Email search
  emailSearchBtn.addEventListener('click', function() {
    const email = emailInput.value;
    if (email) {
      const encodedEmail = encodeURIComponent(email);
      const url = `https://backend-app.lambdatest.com/resources/users?users_page=1&users_search=${encodedEmail}`;
      chrome.tabs.create({ url: url });
    }
  });

  // Enter key for email
  emailInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && emailInput.value) {
      const email = emailInput.value;
      const encodedEmail = encodeURIComponent(email);
      const url = `https://backend-app.lambdatest.com/resources/users?users_page=1&users_search=${encodedEmail}`;
      chrome.tabs.create({ url: url });
    }
  });

  // Auteur Retina
  auteurSearchBtn.addEventListener('click', function() {
    const testId = auteurTestIdInput.value.trim();
    if (testId) {
      const url = `https://auteur-retina.lambdatest.com/?test_id=${encodeURIComponent(testId)}`;
      chrome.tabs.create({ url: url });
    }
  });

  auteurTestIdInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && auteurTestIdInput.value.trim()) {
      const testId = auteurTestIdInput.value.trim();
      const url = `https://auteur-retina.lambdatest.com/?test_id=${encodeURIComponent(testId)}`;
      chrome.tabs.create({ url: url });
    }
  });

  // Kane AI (same URL as Auteur)
  kaneSearchBtn?.addEventListener('click', function() {
    const testId = kaneTestIdInput?.value.trim();
    if (testId) {
      const url = `https://auteur-retina.lambdatest.com/?test_id=${encodeURIComponent(testId)}`;
      chrome.tabs.create({ url: url });
    }
  });

  kaneTestIdInput?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && kaneTestIdInput.value.trim()) {
      const testId = kaneTestIdInput.value.trim();
      const url = `https://auteur-retina.lambdatest.com/?test_id=${encodeURIComponent(testId)}`;
      chrome.tabs.create({ url: url });
    }
  });

  // Mobile Retina
  mobileSearchBtn.addEventListener('click', function () {
    const testId = mobileTestIdInput.value.trim();
    if (testId) {
      const url = `https://mobile-app-retina.lambdatest.com/dashboard/?testId=${encodeURIComponent(testId)}`;
      chrome.tabs.create({ url: url });
    }
  });

  mobileTestIdInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && mobileTestIdInput.value.trim()) {
      const testId = mobileTestIdInput.value.trim();
      const url = `https://mobile-app-retina.lambdatest.com/dashboard/?testId=${encodeURIComponent(testId)}`;
      chrome.tabs.create({ url: url });
    }
  });

  // Web Retina
  webSearchBtn.addEventListener('click', function() {
    const testIdW = webTestIdInput.value.trim();
    if (testIdW) {
      const url = `https://retina.lambdatest.com/dashboard/?testId=${encodeURIComponent(testIdW)}`;
      chrome.tabs.create({ url: url });
    }
  });

  webTestIdInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && webTestIdInput.value.trim()) {
      const testIdW = webTestIdInput.value.trim();
      const url = `https://retina.lambdatest.com/dashboard/?testId=${encodeURIComponent(testIdW)}`;
      chrome.tabs.create({ url: url });
    }
  });
});
