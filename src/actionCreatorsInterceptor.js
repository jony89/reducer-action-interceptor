import actionMetaInterceptor from './actionMetaInterceptor';

export default (actionOrActions: {} | () => mixed, instanceName: string) => {
  if (!actionOrActions) return actionOrActions;

  const actionInterceptor = actionMetaInterceptor(instanceName);
  if (typeof actionOrActions === 'function') {
    return interceptAction(actionInterceptor, actionOrActions);
  }

  return Object.keys(actionOrActions).reduce((result, key) => {
    const actionCreator = actionOrActions[key];

    result[key] = interceptAction(actionInterceptor, actionCreator);

    return result;
  }, {});
};

function interceptAction(actionInterceptor, actionCreator) {
  return (...args) => async (dispatch: Dispatch<*>, getState: mixed) => {
    const dispatchInterceptor = async action => {
      if (typeof action === 'function') {
        return action(dispatchInterceptor, getState);
      }
      return dispatch(actionInterceptor(action));
    };

    const action = actionCreator(...args);
    return dispatchInterceptor(action);
  };
}
