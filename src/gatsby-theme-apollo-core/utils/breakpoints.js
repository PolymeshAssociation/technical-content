const sizes = {
  sm: 600,
  smMd: 700,
  md: 850,
  lg: 1120,
  xl: 1300
};

export default Object.keys(sizes).reduce(
  (acc, key) => ({
    ...acc,
    [key]: `@media (max-width: ${sizes[key]}px)`
  }),
  {}
);
