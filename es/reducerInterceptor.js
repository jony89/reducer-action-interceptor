export default (interceptedReducer, uniqueValue) => (previousState = {}, action) => {
  const actionUniqueValue = action.meta && action.meta.uniqueValue;
  if (!actionUniqueValue) return interceptedReducer(previousState, action);
  return actionUniqueValue !== uniqueValue ? previousState : interceptedReducer(previousState, action);
};
