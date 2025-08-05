// Split imports to avoid large file parsing issues
import { ohioCities } from './cities/ohio.js';
import { kentuckyCities } from './cities/kentucky.js'; 
import { indianaCities } from './cities/indiana.js';

export const cityPages = {
  ...ohioCities,
  ...kentuckyCities,
  ...indianaCities
};