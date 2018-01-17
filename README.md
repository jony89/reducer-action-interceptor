# reducer-action-interceptor

These plugin allows you on one hand to intercept action creators in order to patch the action before bubbling up to the reducers, and on the other hand to intercept the reducers in order to take advantage of that interception.

For example, one can use this to create multiple instances of the same container within the same page, without one affects the other.

- Works well with [redux-thunk](https://github.com/gaearon/redux-thunk)

- Follows [FSA](https://github.com/acdlite/flux-standard-action)

## Example

Let's say we have one `MyContainer` that we want to different instances of him.

`MyContainer` should export it's `actionCreators` object. 
Usually passed to the `connect` function where the `mapDispatchToProps` attribute should come).
These are the actions that we will intercept.

Now we can create two instances :

```js
import { connect } from 'react-redux';
import { actionCreatorsInterceptor, actionMetaInterceptor } from 'reducer-action-interceptor';
import MyContainer, { actionCreators } from '../MyContainer';

const mapStateToPropsFirstComp = state => ({ ...state.firstContainerReducer });
// actionMetaInterceptor(FIRST_CONTAINER_TYPE) is optional, we can intercept however we like
const MyFirstContainerConnected = connect(
    mapStateToPropsFirstComp,
  actionCreatorsInterceptor(actionCreators, actionMetaInterceptor('FIRST_CONTAINER_TYPE')),
)(MyContainer);

const mapStateToPropsSecondComp = state => ({ ...state.secondContainerReducer });
const MySecondContainerConnected = connect(
  mapStateToPropsSecondComp,
  actionCreatorsInterceptor(actionCreators, actionMetaInterceptor('SECOND_CONTAINER_TYPE')),
)(MyContainer);

// optional - pass along the value which makes the container different
MyFirstContainerConnected.defaultProps = {
  ...MyFirstContainerConnected.defaultProps,
  type: FIRST_CONTAINER_TYPE,
};

export default MySecondContainerConnected;
export default MyFirstContainerConnected;
```

Obviously, we need to take care of the reducers as well :

```js
import { combineReducers } from 'redux';
import { reducerInterceptor } from 'reducer-action-interceptor';
import genericMyContainerReducer from './algorithmDirectory.reducer';

export default combineReducers({
  firstContainerReducer: reducerInterceptor(genericMyContainerReducer, 'FIRST_CONTAINER_TYPE'),
  secondContainerReducer: reducerInterceptor(genericMyContainerReducer, 'SECOND_CONTAINER_TYPE'),
});
```

And we are done, each action for each action is solely for that container.

The values `FIRST_CONTAINER_TYPE`, `SECOND_CONTAINER_TYPE`, can be anything you like, even a random number!

More over, the intercepted reducers can still accept non-intercepted actions, so no worries, you are still able to listen to other actions raised from all over the app.
