// Central source of truth for public-facing site identity and contact details.
export const SITE_NAME = 'RV DREAMS LLC';
export const SITE_PHONE = '(000) 000-0000';
export const SITE_PHONE_RAW = '+0000000000';
export const SITE_EMAIL = 'support@rvdreamsllc.com';
export const SITE_PARTNER_EMAIL = 'partners@rvdreamsllc.com';
export const SITE_ADDRESS_ONE_LINE = 'KENNETH N LEVINE SOLE MBR 2601 ST JAMES CHURCH ROAD WILMINGTON, DE 19808';
export const SITE_ADDRESS_LINE1 = 'KENNETH N LEVINE SOLE MBR';
export const SITE_ADDRESS_LINE2 = '2601 ST JAMES CHURCH ROAD WILMINGTON, DE 19808';
export const SITE_ADDRESS_LOCALITY = SITE_ADDRESS_LINE2.match(/([A-Z][A-Z .'-]+),\s*[A-Z]{2}\s+\d{5}/)?.[1]?.trim() || '';
export const SITE_ADDRESS_REGION = SITE_ADDRESS_LINE2.match(/,\s*([A-Z]{2})\s+\d{5}/)?.[1] || '';
export const SITE_ADDRESS_POSTAL_CODE = SITE_ADDRESS_LINE2.match(/\b(\d{5}(?:-\d{4})?)\b/)?.[1] || '';
export const SITE_ADDRESS_COUNTRY = 'United States';
export const SITE_URL = 'https://www.rvdreamsllc.com';


