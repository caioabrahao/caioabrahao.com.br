export const slugify = (str: string) => {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .normalize('NFD') // Split accented letters into base letter and accent
    .replace(/[\u0300-\u036f]/g, '') // Remove all previously split accents
    .replace(/[^a-z0-9 -]/g, '') // Remove all characters that are not letters, numbers, spaces, or hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};