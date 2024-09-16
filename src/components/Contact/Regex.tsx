// TO DO: Regex patterns for name, email, phone, subj, description
// Matches letters and accented characters
export const nameRegex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ]{,50}$/;

// Matches alphanumberic, alphanumberics and special chars, @, alphabetics, ., upper and lower-case alphabetic chars (min 2)
export const emailRegex: RegExp = /^[A-Za-z0-9][A-Za-z0-9\.\_\-\+\%]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

// Matches country code (optional), area code (parentheses optional), separator, 3 digits, separator, 4 digits, extension (optional)
export const phoneRegex: RegExp = /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}(x|ext)?\d{0,5}?$/
