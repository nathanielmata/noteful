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

export function validateContent(content) {
  content = content.trim();
  if (content.length === 0) {
    return 'Content is required';
  } else if (content.length < 3) {
    return 'Content must be greater 3 characters';
  } else if (content.match(/(<\?php|<script>)/)) {
    // you can do some very basic matching here for bad things tbd
    return 'Content should not contain bad things';
  }
}