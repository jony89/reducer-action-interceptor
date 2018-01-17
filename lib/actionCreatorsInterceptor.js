function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

export default (function (actions, interceptor) {
  if (!actions) return actions;
  Object.keys(actions).forEach(function (key) {
    var actionCreator = actions[key];

    actions[key] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var dispatchInterceptor, action;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    dispatchInterceptor =
                    /*#__PURE__*/
                    function () {
                      var _ref2 = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee(action) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                if (!(typeof action === 'function')) {
                                  _context.next = 2;
                                  break;
                                }

                                return _context.abrupt("return", action(dispatchInterceptor, getState));

                              case 2:
                                return _context.abrupt("return", dispatch(interceptor(action)));

                              case 3:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, this);
                      }));

                      return function dispatchInterceptor(_x3) {
                        return _ref2.apply(this, arguments);
                      };
                    }();

                    action = actionCreator.apply(void 0, args);
                    return _context2.abrupt("return", dispatchInterceptor(action));

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }()
      );
    };
  });
  return _extends({}, actions);
});