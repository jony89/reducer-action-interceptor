export default (actions: mixed[], interceptor: () => mixed) => {
  if (!actions) return actions;

  Object.keys(actions).forEach(key => {
    const actionCreator = actions[key];

    actions[key] = (...args) => async (dispatch: Dispatch<*>, getState: mixed) => {
      const dispatchInterceptor = async action => {
        if (typeof action === 'function') {
          return action(dispatchInterceptor, getState);
        }
        return dispatch(interceptor(action));
      };

      const action = actionCreator(...args);
      return dispatchInterceptor(action);
    };
  });

  return { ...(actions) };
};

