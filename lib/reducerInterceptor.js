export default (function (interceptedReducer, uniqueValue) {
  return function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var actionUniqueValue = action.meta && action.meta.uniqueValue;
    if (!actionUniqueValue) return interceptedReducer(previousState, action);
    return actionUniqueValue !== uniqueValue ? previousState : interceptedReducer(previousState, action);
  };
});