/* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character */

export const MATCHING_PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/;
