export default uniqueValue => action => (
  { ...action, meta: { ...(action.meta || {}), uniqueValue } }
);
