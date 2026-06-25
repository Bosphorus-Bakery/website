const regexPatterns = {
  nameRegex: /^[A-Za-zÀ-ÖØ-öø-ÿ]{1,50}$/,
  emailRegex: /^[A-Za-z0-9][A-Za-z0-9\.\_\-\+\%]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
  phoneRegex:
    /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}(x|ext)?\d{0,5}?$/,
};

export const { nameRegex, emailRegex, phoneRegex } = regexPatterns;
