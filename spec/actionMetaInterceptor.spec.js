import reducerInterceptor from '../src/reducerInterceptor';
import actionMetaInterceptor from '../src/actionMetaInterceptor'

const MY_COOL_ACTION = 'MY_COOL_ACTION';
const UNIQUE_VALUE_1 = 'UNIQUE_VALUE_1';

describe('actionMetaInterceptor', () => {
  it('should patch action meta uniqueValue', () => {
    const action = {
      type: MY_COOL_ACTION,
    };
    const patchedAction = actionMetaInterceptor(UNIQUE_VALUE_1)(action);

    expect(patchedAction.meta.uniqueValue).toBe(UNIQUE_VALUE_1);
  });
});