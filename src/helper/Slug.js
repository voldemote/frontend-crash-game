export const createSlug = name => {
  return name
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace(/-[^a-zA-Z0-9]*-/g, '-')
    .replace(/[^a-zA-Z0-9\-]*/g, '');
};

export const setUniqueSlug = (newName, existingSlugs, slugSetter) => {
  const generatedSlug = createSlug(newName);
  let uniqeSlug = generatedSlug;
  let iter = 2;
  while (existingSlugs.includes(uniqeSlug)) {
    uniqeSlug = `${generatedSlug}-${iter++}`;
  }
  slugSetter(uniqeSlug);
};
