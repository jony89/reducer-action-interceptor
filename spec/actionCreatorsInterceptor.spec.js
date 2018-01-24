import { createAction } from 'redux-actions';
import actionCreatorsInterceptor from '../src/actionCreatorsInterceptor';

const MY_COOL_ACTION_1 = 'MY_COOL_ACTION_1';
const MY_COOL_ACTION_2 = 'MY_COOL_ACTION_2';
const MY_UNIQUE_VALUE = 'MY_UNIQUE_VALUE';
const myFirstCoolActionCreator = createAction(MY_COOL_ACTION_1);
const mySecondCoolActionCreator = createAction(MY_COOL_ACTION_2);

const actionCreators = {
  myFirstCoolActionCreator,
  mySecondCoolActionCreator,  
};

describe('actionCreatorsInterceptor', () => {
  it('should create new reference for intercepted actions', () => {
    const interceptedActionCreators = actionCreatorsInterceptor(
      actionCreators,
      MY_UNIQUE_VALUE
    );
    expect(interceptedActionCreators).not.toBe(actionCreators);
  });

  it('should contain the same exact action keys', () => {
    const interceptedActionCreators = actionCreatorsInterceptor(
      actionCreators,
      MY_UNIQUE_VALUE
    );
    expect(interceptedActionCreators.myFirstCoolActionCreator).toBeDefined();  
    expect(interceptedActionCreators.mySecondCoolActionCreator).toBeDefined();  
    expect(Object.keys(interceptedActionCreators).length).toBe(2);  
  });

  it('should intercept action post dispatch', async () => {
    const interceptedActionCreators = actionCreatorsInterceptor(
      actionCreators,
      MY_UNIQUE_VALUE
    );
    const interceptedAction = interceptedActionCreators.myFirstCoolActionCreator;
    const store = global.mock.createEmptyStore();
    await store.dispatch(interceptedAction());

    const actions = store.getActions();
    expect(actions[0].type).toBe(MY_COOL_ACTION_1);
    expect(actions[0].meta.uniqueValue).toBe(MY_UNIQUE_VALUE);
  })
});