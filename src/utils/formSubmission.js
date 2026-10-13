const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/submit.php';

export function collectTracking() {
  const query = new URLSearchParams(window.location.search);
  const utmSource = (query.get('utm_source') || '').trim();
  const referrer = document.referrer || '';
  return {
    utm_source: utmSource,
    referrer,
    gclid: (query.get('gclid') || '').trim(),
    msclkid: (query.get('msclkid') || '').trim(),
    url_source: window.location.href,
    source: utmSource || referrer || 'direct'
  };
}

export async function submitSiteForm(payload) {
  let response;
  try {
    response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new Error('We could not reach the submission server. Please try again in a moment.');
  }

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }
  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error || 'Your submission could not be saved. Please try again.');
  }
  return result;
}
