// Error message for first and last name field
export const NameError = () => {
  return (
    <span>
      Only letters and accented characters allowed.
    </span>
  )
} // Error message for email field
export const EmailError = () => {
  return (
    <span>
      Please enter a valid email address.
    </span>
  )
} // Error message for phone number field
export const PhoneError = () => {
  return (
    <span>
      Please enter a valid phone number.
    </span>
  )
}
export const SubjectError = () => {
  return (
    <span>
      Please use 60 characters or less.
    </span>
  )
}
export const DescriptionError = () => {
  return (
    <span>
      Please use 250 characters or less.
    </span>
  )
}

export const RequiredError = () => {
  return (
    <span>
      Please fill all required fields.
    </span>
  )
}
