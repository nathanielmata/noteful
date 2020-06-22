export function validateName(name) {
  name = name.trim();
  if (name.length === 0) {
    return 'Name is required';
  } else if (name.length < 3 || name.length > 30) {
    return 'Name must be between 3 and 30 characters';
  } else if (name.match(/[^a-zA-Z0-9\s]/g)) {
    return 'Name cannot contain special characters';
  }
}