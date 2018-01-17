import reducerInterceptor from '../src/reducerInterceptor';
import actionMetaInterceptor from '../src/actionMetaInterceptor'

const MY_COOL_ACTION = 'MY_COOL_ACTION';
const UNIQUE_VALUE_1 = 'UNIQUE_VALUE_1';
const UNIQUE_VALUE_2 = 'UNIQUE_VALUE_2';

const reducer = (previousState = {}, action) => {
  let nextState;

  switch (action.type) {
    case MY_COOL_ACTION:
      nextState = {
        name: 'jonathan'
      };
      break;
    default:
      nextState = previousState;
  }

  return nextState;
}


describe('reducerInterceptor', () => {
  it('should not intercept if no action uniqueValue', () => {
    const action = {
      type: MY_COOL_ACTION
    }

    const interceptedReducer = reducerInterceptor(reducer, UNIQUE_VALUE_1);
    const previousState = {};
    const nextState = interceptedReducer(previousState, action);

    expect(nextState.name).toBe('jonathan');
  });

  it('should trigger reducers if uniqueValue criteria is met', () => {
    const action = {
      type: MY_COOL_ACTION,
    };
    const patchedAction = actionMetaInterceptor(UNIQUE_VALUE_1)(action);
    const interceptedReducer = reducerInterceptor(reducer, UNIQUE_VALUE_1);
    const previousState = {};
    const nextState = interceptedReducer(previousState, patchedAction);

    expect(nextState.name).toBe('jonathan');
  });

  it('should not trigger reducers if uniqueValue criteria not met', () => {
    const action = {
      type: MY_COOL_ACTION,
    };
    const patchedAction = actionMetaInterceptor(UNIQUE_VALUE_2)(action);
    const interceptedReducer = reducerInterceptor(reducer, UNIQUE_VALUE_1);
    const previousState = {};
    const nextState = interceptedReducer(previousState, patchedAction);

    expect(nextState).toBe(previousState);
  });
});