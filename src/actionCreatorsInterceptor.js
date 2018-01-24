import actionMetaInterceptor from './actionMetaInterceptor';

export default (actions: {}, instanceName: string) => {
  if (!actions) return actions;

  const actionInterceptor = actionMetaInterceptor(instanceName)

  Object.keys(actions).forEach(key => {
    const actionCreator = actions[key];

    actions[key] = (...args) => async (dispatch: Dispatch<*>, getState: mixed) => {
      const dispatchInterceptor = async action => {
        if (typeof action === 'function') {
          return action(dispatchInterceptor, getState);
        }
        return dispatch(actionInterceptor(action));
      };

      const action = actionCreator(...args);
      return dispatchInterceptor(action);
    };
  });

  return { ...(actions) };
};

