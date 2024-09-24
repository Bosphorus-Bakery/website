// Matches letters and accented characters
export const nameRegex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ]{1,50}$/;

// Matches alphanumberic, alphanumberics and special chars, @, alphabetics, ., upper and lower-case alphabetic chars (min 2)
export const emailRegex: RegExp = /^[A-Za-z0-9][A-Za-z0-9\.\_\-\+\%]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

// Matches country code (optional), area code (parentheses optional), separator, 3 digits, separator, 4 digits, extension (optional)
export const phoneRegex: RegExp = /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}(x|ext)?\d{0,5}?$/;

// Matches any characters under 60 characters
export const subjectRegex: RegExp = /.{1,60}/;

// Matches any characters under 500 characters
export const descriptionRegex: RegExp = /.{1,250}/;