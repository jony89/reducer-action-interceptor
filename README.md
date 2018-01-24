# reducer-action-interceptor

These plugin allows you on one hand to intercept action creators in order to patch the action before bubbling up to the reducers, and on the other hand to intercept the reducers in order to take advantage of that interception.

For example, one can use this to create multiple instances of the same container within the same page, without one affecting the other.

- Works well with [redux-thunk](https://github.com/gaearon/redux-thunk)

- Follows [FSA](https://github.com/acdlite/flux-standard-action)

## Example

Let's say we want two instances of `MyContainer`.

`MyContainer` should export it's `actionCreators` object. 
Usually this object passed to the `connect` function where the `mapDispatchToProps` attribute comes in.
These are the actions that we will intercept.

Now we can create two instances :

```js
import { connect } from 'react-redux';
import { actionCreatorsInterceptor } from 'reducer-action-interceptor';
import MyContainer, { actionCreators } from '../MyContainer';

/**
 * First Container 
**/
const mapStateToPropsFirstComp = state => ({ ...state.firstContainerReducer });
export const MyFirstContainerConnected = connect(
  mapStateToPropsFirstComp,
  actionCreatorsInterceptor(actionCreators, 'INSTANCE1'),
)(MyContainer);

/**
 * Second Container 
**/
const mapStateToPropsSecondComp = state => ({ ...state.secondContainerReducer });
export const MySecondContainerConnected = connect(
  mapStateToPropsSecondComp,
  actionCreatorsInterceptor(actionCreators, 'INSTANCE2'),
)(MyContainer);
```

Obviously, we need to take care of the reducers as well. using the HOR - `reducerInterceptor` :

```js
import { combineReducers } from 'redux';
import { reducerInterceptor } from 'reducer-action-interceptor';
import someGenericReducer from './someGenericReducer.reducer';

export default combineReducers({
  firstContainerReducer: reducerInterceptor(someGenericReducer, 'INSTANCE1'),
  secondContainerReducer: reducerInterceptor(someGenericReducer, 'INSTANCE2'),
});
```

And we are done, each action for each action is solely for that container.

The values `FIRST_CONTAINER_TYPE`, `SECOND_CONTAINER_TYPE`, can be anything you like, even a random number!

More over, the intercepted reducers can still accept non-intercepted actions, so no worries, you are still able to listen to other actions raised from all over the app.
