// TO DO: Regex patterns for name, email, phone, subj, description
// '^' amd '$' marks start and end of match respectively
export const nameRegex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ]{0,50}$/;

// Matches any alphanumberic, alphanumbers and special chars, @, lowercase chars, ., upper and lower-case alphabetic chars (min 2)
export const emailRegex: RegExp = /^[A-Za-z0-9][A-Za-z0-9\.\_\-\+\%]+@[a-z]\.[a-zA-Z]{2,}$/;
