'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormDefaultProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};
var reop = function reop(d) {
  return d;
};

var FormDefaultProps = exports.FormDefaultProps = {
  loadState: noop,
  defaultValues: {},
  preValidate: reop,
  validate: function validate() {
    return null;
  },
  onValidationFail: noop,
  onChange: noop,
  saveState: noop,
  willUnmount: noop,
  preSubmit: reop,
  onSubmit: noop,
  postSubmit: noop
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.setAllValues = _this.setAllValues.bind(_this);
    _this.setValue = _this.setValue.bind(_this);
    _this.getValue = _this.getValue.bind(_this);
    _this.setNestedError = _this.setNestedError.bind(_this);
    _this.getError = _this.getError.bind(_this);
    _this.setTouched = _this.setTouched.bind(_this);
    _this.getTouched = _this.getTouched.bind(_this);
    _this.addValue = _this.addValue.bind(_this);
    _this.removeValue = _this.removeValue.bind(_this);
    _this.swapValues = _this.swapValues.bind(_this);
    _this.setAllTouched = _this.setAllTouched.bind(_this);
    _this.resetForm = _this.resetForm.bind(_this);
    _this.submitForm = _this.submitForm.bind(_this);
    _this.getDefaultState = _this.getDefaultState.bind(_this); // using 'Default' since `Initial` will now throw deprecation warnings

    _this.state = _this.getDefaultState();
    return _this;
  }

  _createClass(Form, [{
    key: 'getDefaultState',
    value: function getDefaultState() {
      var _props = this.props,
          defaultValues = _props.defaultValues,
          values = _props.values,
          loadState = _props.loadState;


      var mergedValues = _extends({}, defaultValues, values);

      return loadState(this.props, this) || {
        values: mergedValues,
        touched: {},
        errors: {},
        nestedErrors: {}
      };
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        formAPI: this.getAPI()
      };
    }
  }, {
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      this.emitChange(this.state, true);
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(props) {
      var defaultValues = props.defaultValues,
          values = props.values;

      if (this.props.defaultValues === defaultValues && this.props.values === values) {
        return;
      }

      var mergedValues = this.props.defaultValues === defaultValues ? values : _extends({}, defaultValues, values);

      this.setFormState({
        values: mergedValues || {}
      }, true);
    }
  }, {
    key: 'componentWillUmount',
    value: function componentWillUmount() {
      this.props.willUnmount(this.state, this.props, this);
    }

    // API

  }, {
    key: 'setAllValues',
    value: function setAllValues(values, noTouch) {
      if (noTouch) {
        return this.setFormState({ values: values });
      }
      this.setFormState({ values: values, touched: {} });
    }
  }, {
    key: 'setValue',
    value: function setValue(field, value, noTouch) {
      var state = this.state;
      var values = _utils2.default.set(state.values, field, value);
      // Also set touched since the value is changing
      if (noTouch) {
        return this.setFormState({ values: values });
      }
      var touched = _utils2.default.set(state.touched, field);
      this.setFormState({ values: values, touched: touched });
    }
  }, {
    key: 'getValue',
    value: function getValue(field, fallback) {
      var state = this.state;
      var val = _utils2.default.get(state.values, field);
      return typeof val !== 'undefined' ? val : fallback;
    }
  }, {
    key: 'setNestedError',
    value: function setNestedError(field) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var nestedErrors = _utils2.default.set(this.state.nestedErrors, field, value);
      this.setFormState({ nestedErrors: nestedErrors });
    }
  }, {
    key: 'getError',
    value: function getError(field) {
      return _utils2.default.get(this.state.errors, field);
    }
  }, {
    key: 'setTouched',
    value: function setTouched(field) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var touched = _utils2.default.set(this.state.touched, field, value);
      this.setFormState({ touched: touched });
    }
  }, {
    key: 'getTouched',
    value: function getTouched(field) {
      var state = this.state;
      if (this.state.dirty === true || this.props.touched === true) {
        return true;
      }
      return _utils2.default.get(state.touched, field);
    }
  }, {
    key: 'addValue',
    value: function addValue(field, value) {
      var state = this.state;
      var values = _utils2.default.set(state.values, field, [].concat(_toConsumableArray(_utils2.default.get(state.values, field, [])), [value]));
      this.setFormState({ values: values });
    }
  }, {
    key: 'removeValue',
    value: function removeValue(field, index) {
      var state = this.state;
      var fieldValue = _utils2.default.get(state.values, field, []);
      var values = _utils2.default.set(state.values, field, [].concat(_toConsumableArray(fieldValue.slice(0, index)), _toConsumableArray(fieldValue.slice(index + 1))));
      this.setFormState({ values: values });
    }
  }, {
    key: 'swapValues',
    value: function swapValues(field, index, destIndex) {
      var state = this.state;

      var min = Math.min(index, destIndex);
      var max = Math.max(index, destIndex);

      var fieldValues = _utils2.default.get(state.values, field, []);
      var values = _utils2.default.set(state.values, field, [].concat(_toConsumableArray(fieldValues.slice(0, min)), [fieldValues[max]], _toConsumableArray(fieldValues.slice(min + 1, max)), [fieldValues[min]], _toConsumableArray(fieldValues.slice(max + 1))));
      this.setFormState({ values: values });
    }
  }, {
    key: 'setAllTouched',
    value: function setAllTouched() {
      var dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var state = arguments[1];

      this.setFormState(_extends({}, state, {
        dirty: !!dirty
      }));
    }
  }, {
    key: 'resetForm',
    value: function resetForm() {
      return this.setFormState(this.getDefaultState(), true);
    }
  }, {
    key: 'submitForm',
    value: function submitForm(e) {
      e && e.preventDefault && e.preventDefault(e);
      var state = this.state;
      var errors = this.validate(state.values, state, this.props);
      if (errors) {
        if (!state.dirty) {
          this.setAllTouched(true, { errors: errors });
        }
        return this.props.onValidationFail(state.values, state, this.props, this);
      }
      var preSubmitValues = this.props.preSubmit(state.values, state, this.props, this);
      this.props.onSubmit(preSubmitValues, state, this.props, this);
      this.props.postSubmit(preSubmitValues, state, this.props, this);
    }

    // Utils

  }, {
    key: 'getAPI',
    value: function getAPI() {
      return {
        setAllValues: this.setAllValues,
        setValue: this.setValue,
        getValue: this.getValue,
        setNestedError: this.setNestedError,
        getError: this.getError,
        setTouched: this.setTouched,
        getTouched: this.getTouched,
        addValue: this.addValue,
        removeValue: this.removeValue,
        swapValues: this.swapValues,
        setAllTouched: this.setAllTouched,
        resetForm: this.resetForm,
        submitForm: this.submitForm
      };
    }
  }, {
    key: 'setFormState',
    value: function setFormState(newState, silent) {
      var _this2 = this;

      if (newState && newState.values && !newState.errors) {
        newState.values = this.props.preValidate(newState.values, newState, this.props, this);
        newState.errors = this.validate(newState.values, newState, this.props);
      }
      this.setState(newState, function () {
        _this2.props.saveState(_this2.state, _this2.props, _this2);
        if (!silent) {
          _this2.emitChange(_this2.state, _this2.props);
        }
      });
    }
  }, {
    key: 'emitChange',
    value: function emitChange(state, initial) {
      this.props.onChange(state, this.props, initial, this);
    }
  }, {
    key: 'validate',
    value: function validate(values, state, props) {
      var errors = this.props.validate(removeNestedErrorValues(values, this.state ? this.state.nestedErrors : {}), state, props, this);
      return cleanErrors(errors);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _extends({}, this.props, this.state, this.getAPI());

      var children = props.children,
          rest = _objectWithoutProperties(props, ['children']);

      var resolvedChild = typeof children === 'function' ? children(rest) : children;
      return resolvedChild;
    }
  }]);

  return Form;
}(_react2.default.Component);

Form.defaultProps = FormDefaultProps;
Form.childContextTypes = { formAPI: _propTypes2.default.object };
exports.default = Form;

// Utils

function cleanErrors(err) {
  if (_utils2.default.isObject(err)) {
    var resolved = _utils2.default.mapValues(err, cleanErrors);
    var found = _utils2.default.pickBy(resolved, function (d) {
      return d;
    });
    return Object.keys(found).length ? resolved : undefined;
  }
  if (_utils2.default.isArray(err)) {
    var _resolved = err.map(cleanErrors);
    var _found = _resolved.find(function (d) {
      return d;
    });
    return _found ? _resolved : undefined;
  }
  return err;
}

// removeNestedErrorValues recurses the values object and turns any
// field that has a truthy corresponding nested form error field into undefined.
// This allows properly validating a nested form by detecting that undefined value
// in the validation function
function removeNestedErrorValues(values, nestedErrors) {
  var recurse = function recurse(current) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (_utils2.default.isObject(current)) {
      return _utils2.default.mapValues(current, function (d, i) {
        return recurse(d, [].concat(_toConsumableArray(path), [i]));
      });
    }
    if (_utils2.default.isArray(current)) {
      return current.map(function (d, key) {
        return recurse(d, [].concat(_toConsumableArray(path), [key]));
      });
    }
    if (!_utils2.default.isObject(current) && !_utils2.default.isArray(current) && current) {
      return _utils2.default.set(values, path, undefined);
    }
    return current;
  };
  recurse(nestedErrors);
  return values;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtLmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJyZW9wIiwiZCIsIkZvcm1EZWZhdWx0UHJvcHMiLCJsb2FkU3RhdGUiLCJkZWZhdWx0VmFsdWVzIiwicHJlVmFsaWRhdGUiLCJ2YWxpZGF0ZSIsIm9uVmFsaWRhdGlvbkZhaWwiLCJvbkNoYW5nZSIsInNhdmVTdGF0ZSIsIndpbGxVbm1vdW50IiwicHJlU3VibWl0Iiwib25TdWJtaXQiLCJwb3N0U3VibWl0IiwiRm9ybSIsInByb3BzIiwic2V0QWxsVmFsdWVzIiwiYmluZCIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJzZXROZXN0ZWRFcnJvciIsImdldEVycm9yIiwic2V0VG91Y2hlZCIsImdldFRvdWNoZWQiLCJhZGRWYWx1ZSIsInJlbW92ZVZhbHVlIiwic3dhcFZhbHVlcyIsInNldEFsbFRvdWNoZWQiLCJyZXNldEZvcm0iLCJzdWJtaXRGb3JtIiwiZ2V0RGVmYXVsdFN0YXRlIiwic3RhdGUiLCJ2YWx1ZXMiLCJtZXJnZWRWYWx1ZXMiLCJ0b3VjaGVkIiwiZXJyb3JzIiwibmVzdGVkRXJyb3JzIiwiZm9ybUFQSSIsImdldEFQSSIsImVtaXRDaGFuZ2UiLCJzZXRGb3JtU3RhdGUiLCJub1RvdWNoIiwiZmllbGQiLCJ2YWx1ZSIsInNldCIsImZhbGxiYWNrIiwidmFsIiwiZ2V0IiwiZGlydHkiLCJpbmRleCIsImZpZWxkVmFsdWUiLCJzbGljZSIsImRlc3RJbmRleCIsIm1pbiIsIk1hdGgiLCJtYXgiLCJmaWVsZFZhbHVlcyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInByZVN1Ym1pdFZhbHVlcyIsIm5ld1N0YXRlIiwic2lsZW50Iiwic2V0U3RhdGUiLCJpbml0aWFsIiwicmVtb3ZlTmVzdGVkRXJyb3JWYWx1ZXMiLCJjbGVhbkVycm9ycyIsImNoaWxkcmVuIiwicmVzdCIsInJlc29sdmVkQ2hpbGQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImVyciIsImlzT2JqZWN0IiwicmVzb2x2ZWQiLCJtYXBWYWx1ZXMiLCJmb3VuZCIsInBpY2tCeSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwibWFwIiwiZmluZCIsInJlY3Vyc2UiLCJjdXJyZW50IiwicGF0aCIsImkiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLEdBQU0sQ0FBRSxDQUFyQjtBQUNBLElBQU1DLE9BQU8sU0FBUEEsSUFBTztBQUFBLFNBQUtDLENBQUw7QUFBQSxDQUFiOztBQUVPLElBQU1DLDhDQUFtQjtBQUM5QkMsYUFBV0osSUFEbUI7QUFFOUJLLGlCQUFlLEVBRmU7QUFHOUJDLGVBQWFMLElBSGlCO0FBSTlCTSxZQUFVO0FBQUEsV0FBTSxJQUFOO0FBQUEsR0FKb0I7QUFLOUJDLG9CQUFrQlIsSUFMWTtBQU05QlMsWUFBVVQsSUFOb0I7QUFPOUJVLGFBQVdWLElBUG1CO0FBUTlCVyxlQUFhWCxJQVJpQjtBQVM5QlksYUFBV1gsSUFUbUI7QUFVOUJZLFlBQVViLElBVm9CO0FBVzlCYyxjQUFZZDtBQVhrQixDQUF6Qjs7SUFjRGUsSTs7O0FBR0osZ0JBQWFDLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSw0R0FDWkEsS0FEWTs7QUFHbEIsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQixPQUFwQjtBQUNBLFVBQUtDLFFBQUwsR0FBZ0IsTUFBS0EsUUFBTCxDQUFjRCxJQUFkLE9BQWhCO0FBQ0EsVUFBS0UsUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNGLElBQWQsT0FBaEI7QUFDQSxVQUFLRyxjQUFMLEdBQXNCLE1BQUtBLGNBQUwsQ0FBb0JILElBQXBCLE9BQXRCO0FBQ0EsVUFBS0ksUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNKLElBQWQsT0FBaEI7QUFDQSxVQUFLSyxVQUFMLEdBQWtC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QUFGLENBQVVJLE9BQVYsQ0FBSixFQUF3QjtBQUN0QixhQUFPQSxRQUFRSCxHQUFSLENBQVksVUFBQ25GLENBQUQsRUFBSXlGLEdBQUosRUFBWTtBQUM3QixlQUFPSixRQUFRckYsQ0FBUiwrQkFBZXVGLElBQWYsSUFBcUJFLEdBQXJCLEdBQVA7QUFDRCxPQUZNLENBQVA7QUFHRDtBQUNELFFBQUksQ0FBQyxnQkFBRWhCLFFBQUYsQ0FBV2EsT0FBWCxDQUFELElBQXdCLENBQUMsZ0JBQUVKLE9BQUYsQ0FBVUksT0FBVixDQUF6QixJQUErQ0EsT0FBbkQsRUFBNEQ7QUFDMUQsYUFBTyxnQkFBRTNDLEdBQUYsQ0FBTVosTUFBTixFQUFjd0QsSUFBZCxFQUFvQk4sU0FBcEIsQ0FBUDtBQUNEO0FBQ0QsV0FBT0ssT0FBUDtBQUNELEdBZkQ7QUFnQkFELFVBQVFsRCxZQUFSO0FBQ0EsU0FBT0osTUFBUDtBQUNEIiwiZmlsZSI6ImZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuXG5jb25zdCBub29wID0gKCkgPT4ge31cbmNvbnN0IHJlb3AgPSBkID0+IGRcblxuZXhwb3J0IGNvbnN0IEZvcm1EZWZhdWx0UHJvcHMgPSB7XG4gIGxvYWRTdGF0ZTogbm9vcCxcbiAgZGVmYXVsdFZhbHVlczoge30sXG4gIHByZVZhbGlkYXRlOiByZW9wLFxuICB2YWxpZGF0ZTogKCkgPT4gbnVsbCxcbiAgb25WYWxpZGF0aW9uRmFpbDogbm9vcCxcbiAgb25DaGFuZ2U6IG5vb3AsXG4gIHNhdmVTdGF0ZTogbm9vcCxcbiAgd2lsbFVubW91bnQ6IG5vb3AsXG4gIHByZVN1Ym1pdDogcmVvcCxcbiAgb25TdWJtaXQ6IG5vb3AsXG4gIHBvc3RTdWJtaXQ6IG5vb3AsXG59XG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gRm9ybURlZmF1bHRQcm9wc1xuICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXMgPSB7IGZvcm1BUEk6IFByb3BUeXBlcy5vYmplY3QgfVxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc2V0QWxsVmFsdWVzID0gdGhpcy5zZXRBbGxWYWx1ZXMuYmluZCh0aGlzKVxuICAgIHRoaXMuc2V0VmFsdWUgPSB0aGlzLnNldFZhbHVlLmJpbmQodGhpcylcbiAgICB0aGlzLmdldFZhbHVlID0gdGhpcy5nZXRWYWx1ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5zZXROZXN0ZWRFcnJvciA9IHRoaXMuc2V0TmVzdGVkRXJyb3IuYmluZCh0aGlzKVxuICAgIHRoaXMuZ2V0RXJyb3IgPSB0aGlzLmdldEVycm9yLmJpbmQodGhpcylcbiAgICB0aGlzLnNldFRvdWNoZWQgPSB0aGlzLnNldFRvdWNoZWQuYmluZCh0aGlzKVxuICAgIHRoaXMuZ2V0VG91Y2hlZCA9IHRoaXMuZ2V0VG91Y2hlZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5hZGRWYWx1ZSA9IHRoaXMuYWRkVmFsdWUuYmluZCh0aGlzKVxuICAgIHRoaXMucmVtb3ZlVmFsdWUgPSB0aGlzLnJlbW92ZVZhbHVlLmJpbmQodGhpcylcbiAgICB0aGlzLnN3YXBWYWx1ZXMgPSB0aGlzLnN3YXBWYWx1ZXMuYmluZCh0aGlzKVxuICAgIHRoaXMuc2V0QWxsVG91Y2hlZCA9IHRoaXMuc2V0QWxsVG91Y2hlZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5yZXNldEZvcm0gPSB0aGlzLnJlc2V0Rm9ybS5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcylcbiAgICB0aGlzLmdldERlZmF1bHRTdGF0ZSA9IHRoaXMuZ2V0RGVmYXVsdFN0YXRlLmJpbmQodGhpcykgLy8gdXNpbmcgJ0RlZmF1bHQnIHNpbmNlIGBJbml0aWFsYCB3aWxsIG5vdyB0aHJvdyBkZXByZWNhdGlvbiB3YXJuaW5nc1xuXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0RGVmYXVsdFN0YXRlKClcbiAgfVxuXG4gIGdldERlZmF1bHRTdGF0ZSAoKSB7XG4gICAgY29uc3QgeyBkZWZhdWx0VmFsdWVzLCB2YWx1ZXMsIGxvYWRTdGF0ZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgY29uc3QgbWVyZ2VkVmFsdWVzID0ge1xuICAgICAgLi4uZGVmYXVsdFZhbHVlcyxcbiAgICAgIC4uLnZhbHVlcyxcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgbG9hZFN0YXRlKHRoaXMucHJvcHMsIHRoaXMpIHx8IHtcbiAgICAgICAgdmFsdWVzOiBtZXJnZWRWYWx1ZXMsXG4gICAgICAgIHRvdWNoZWQ6IHt9LFxuICAgICAgICBlcnJvcnM6IHt9LFxuICAgICAgICBuZXN0ZWRFcnJvcnM6IHt9LFxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIGdldENoaWxkQ29udGV4dCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1BUEk6IHRoaXMuZ2V0QVBJKCksXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcbiAgICB0aGlzLmVtaXRDaGFuZ2UodGhpcy5zdGF0ZSwgdHJ1ZSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKHByb3BzKSB7XG4gICAgY29uc3QgeyBkZWZhdWx0VmFsdWVzLCB2YWx1ZXMgfSA9IHByb3BzXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWVzID09PSBkZWZhdWx0VmFsdWVzICYmXG4gICAgICB0aGlzLnByb3BzLnZhbHVlcyA9PT0gdmFsdWVzXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBtZXJnZWRWYWx1ZXMgPVxuICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWVzID09PSBkZWZhdWx0VmFsdWVzXG4gICAgICAgID8gdmFsdWVzXG4gICAgICAgIDogeyAuLi5kZWZhdWx0VmFsdWVzLCAuLi52YWx1ZXMgfVxuXG4gICAgdGhpcy5zZXRGb3JtU3RhdGUoXG4gICAgICB7XG4gICAgICAgIHZhbHVlczogbWVyZ2VkVmFsdWVzIHx8IHt9LFxuICAgICAgfSxcbiAgICAgIHRydWVcbiAgICApXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW1vdW50ICgpIHtcbiAgICB0aGlzLnByb3BzLndpbGxVbm1vdW50KHRoaXMuc3RhdGUsIHRoaXMucHJvcHMsIHRoaXMpXG4gIH1cblxuICAvLyBBUElcbiAgc2V0QWxsVmFsdWVzICh2YWx1ZXMsIG5vVG91Y2gpIHtcbiAgICBpZiAobm9Ub3VjaCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0Rm9ybVN0YXRlKHsgdmFsdWVzIH0pXG4gICAgfVxuICAgIHRoaXMuc2V0Rm9ybVN0YXRlKHsgdmFsdWVzLCB0b3VjaGVkOiB7fSB9KVxuICB9XG5cbiAgc2V0VmFsdWUgKGZpZWxkLCB2YWx1ZSwgbm9Ub3VjaCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IHZhbHVlcyA9IF8uc2V0KHN0YXRlLnZhbHVlcywgZmllbGQsIHZhbHVlKVxuICAgIC8vIEFsc28gc2V0IHRvdWNoZWQgc2luY2UgdGhlIHZhbHVlIGlzIGNoYW5naW5nXG4gICAgaWYgKG5vVG91Y2gpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldEZvcm1TdGF0ZSh7IHZhbHVlcyB9KVxuICAgIH1cbiAgICBjb25zdCB0b3VjaGVkID0gXy5zZXQoc3RhdGUudG91Y2hlZCwgZmllbGQpXG4gICAgdGhpcy5zZXRGb3JtU3RhdGUoeyB2YWx1ZXMsIHRvdWNoZWQgfSlcbiAgfVxuXG4gIGdldFZhbHVlIChmaWVsZCwgZmFsbGJhY2spIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCB2YWwgPSBfLmdldChzdGF0ZS52YWx1ZXMsIGZpZWxkKVxuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyA/IHZhbCA6IGZhbGxiYWNrXG4gIH1cblxuICBzZXROZXN0ZWRFcnJvciAoZmllbGQsIHZhbHVlID0gdHJ1ZSkge1xuICAgIGNvbnN0IG5lc3RlZEVycm9ycyA9IF8uc2V0KHRoaXMuc3RhdGUubmVzdGVkRXJyb3JzLCBmaWVsZCwgdmFsdWUpXG4gICAgdGhpcy5zZXRGb3JtU3RhdGUoeyBuZXN0ZWRFcnJvcnMgfSlcbiAgfVxuXG4gIGdldEVycm9yIChmaWVsZCkge1xuICAgIHJldHVybiBfLmdldCh0aGlzLnN0YXRlLmVycm9ycywgZmllbGQpXG4gIH1cblxuICBzZXRUb3VjaGVkIChmaWVsZCwgdmFsdWUgPSB0cnVlKSB7XG4gICAgY29uc3QgdG91Y2hlZCA9IF8uc2V0KHRoaXMuc3RhdGUudG91Y2hlZCwgZmllbGQsIHZhbHVlKVxuICAgIHRoaXMuc2V0Rm9ybVN0YXRlKHsgdG91Y2hlZCB9KVxuICB9XG5cbiAgZ2V0VG91Y2hlZCAoZmllbGQpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGVcbiAgICBpZiAodGhpcy5zdGF0ZS5kaXJ0eSA9PT0gdHJ1ZSB8fCB0aGlzLnByb3BzLnRvdWNoZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBfLmdldChzdGF0ZS50b3VjaGVkLCBmaWVsZClcbiAgfVxuXG4gIGFkZFZhbHVlIChmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCB2YWx1ZXMgPSBfLnNldChzdGF0ZS52YWx1ZXMsIGZpZWxkLCBbXG4gICAgICAuLi5fLmdldChzdGF0ZS52YWx1ZXMsIGZpZWxkLCBbXSksXG4gICAgICB2YWx1ZSxcbiAgICBdKVxuICAgIHRoaXMuc2V0Rm9ybVN0YXRlKHsgdmFsdWVzIH0pXG4gIH1cblxuICByZW1vdmVWYWx1ZSAoZmllbGQsIGluZGV4KSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgZmllbGRWYWx1ZSA9IF8uZ2V0KHN0YXRlLnZhbHVlcywgZmllbGQsIFtdKVxuICAgIGNvbnN0IHZhbHVlcyA9IF8uc2V0KHN0YXRlLnZhbHVlcywgZmllbGQsIFtcbiAgICAgIC4uLmZpZWxkVmFsdWUuc2xpY2UoMCwgaW5kZXgpLFxuICAgICAgLi4uZmllbGRWYWx1ZS5zbGljZShpbmRleCArIDEpLFxuICAgIF0pXG4gICAgdGhpcy5zZXRGb3JtU3RhdGUoeyB2YWx1ZXMgfSlcbiAgfVxuXG4gIHN3YXBWYWx1ZXMgKGZpZWxkLCBpbmRleCwgZGVzdEluZGV4KSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlXG5cbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihpbmRleCwgZGVzdEluZGV4KVxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KGluZGV4LCBkZXN0SW5kZXgpXG5cbiAgICBjb25zdCBmaWVsZFZhbHVlcyA9IF8uZ2V0KHN0YXRlLnZhbHVlcywgZmllbGQsIFtdKVxuICAgIGNvbnN0IHZhbHVlcyA9IF8uc2V0KHN0YXRlLnZhbHVlcywgZmllbGQsIFtcbiAgICAgIC4uLmZpZWxkVmFsdWVzLnNsaWNlKDAsIG1pbiksXG4gICAgICBmaWVsZFZhbHVlc1ttYXhdLFxuICAgICAgLi4uZmllbGRWYWx1ZXMuc2xpY2UobWluICsgMSwgbWF4KSxcbiAgICAgIGZpZWxkVmFsdWVzW21pbl0sXG4gICAgICAuLi5maWVsZFZhbHVlcy5zbGljZShtYXggKyAxKSxcbiAgICBdKVxuICAgIHRoaXMuc2V0Rm9ybVN0YXRlKHsgdmFsdWVzIH0pXG4gIH1cblxuICBzZXRBbGxUb3VjaGVkIChkaXJ0eSA9IHRydWUsIHN0YXRlKSB7XG4gICAgdGhpcy5zZXRGb3JtU3RhdGUoe1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBkaXJ0eTogISFkaXJ0eSxcbiAgICB9KVxuICB9XG5cbiAgcmVzZXRGb3JtICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRGb3JtU3RhdGUodGhpcy5nZXREZWZhdWx0U3RhdGUoKSwgdHJ1ZSlcbiAgfVxuXG4gIHN1Ym1pdEZvcm0gKGUpIHtcbiAgICBlICYmIGUucHJldmVudERlZmF1bHQgJiYgZS5wcmV2ZW50RGVmYXVsdChlKVxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IGVycm9ycyA9IHRoaXMudmFsaWRhdGUoc3RhdGUudmFsdWVzLCBzdGF0ZSwgdGhpcy5wcm9wcylcbiAgICBpZiAoZXJyb3JzKSB7XG4gICAgICBpZiAoIXN0YXRlLmRpcnR5KSB7XG4gICAgICAgIHRoaXMuc2V0QWxsVG91Y2hlZCh0cnVlLCB7IGVycm9ycyB9KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25WYWxpZGF0aW9uRmFpbChzdGF0ZS52YWx1ZXMsIHN0YXRlLCB0aGlzLnByb3BzLCB0aGlzKVxuICAgIH1cbiAgICBjb25zdCBwcmVTdWJtaXRWYWx1ZXMgPSB0aGlzLnByb3BzLnByZVN1Ym1pdChcbiAgICAgIHN0YXRlLnZhbHVlcyxcbiAgICAgIHN0YXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICAgIHRoaXNcbiAgICApXG4gICAgdGhpcy5wcm9wcy5vblN1Ym1pdChwcmVTdWJtaXRWYWx1ZXMsIHN0YXRlLCB0aGlzLnByb3BzLCB0aGlzKVxuICAgIHRoaXMucHJvcHMucG9zdFN1Ym1pdChwcmVTdWJtaXRWYWx1ZXMsIHN0YXRlLCB0aGlzLnByb3BzLCB0aGlzKVxuICB9XG5cbiAgLy8gVXRpbHNcbiAgZ2V0QVBJICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0QWxsVmFsdWVzOiB0aGlzLnNldEFsbFZhbHVlcyxcbiAgICAgIHNldFZhbHVlOiB0aGlzLnNldFZhbHVlLFxuICAgICAgZ2V0VmFsdWU6IHRoaXMuZ2V0VmFsdWUsXG4gICAgICBzZXROZXN0ZWRFcnJvcjogdGhpcy5zZXROZXN0ZWRFcnJvcixcbiAgICAgIGdldEVycm9yOiB0aGlzLmdldEVycm9yLFxuICAgICAgc2V0VG91Y2hlZDogdGhpcy5zZXRUb3VjaGVkLFxuICAgICAgZ2V0VG91Y2hlZDogdGhpcy5nZXRUb3VjaGVkLFxuICAgICAgYWRkVmFsdWU6IHRoaXMuYWRkVmFsdWUsXG4gICAgICByZW1vdmVWYWx1ZTogdGhpcy5yZW1vdmVWYWx1ZSxcbiAgICAgIHN3YXBWYWx1ZXM6IHRoaXMuc3dhcFZhbHVlcyxcbiAgICAgIHNldEFsbFRvdWNoZWQ6IHRoaXMuc2V0QWxsVG91Y2hlZCxcbiAgICAgIHJlc2V0Rm9ybTogdGhpcy5yZXNldEZvcm0sXG4gICAgICBzdWJtaXRGb3JtOiB0aGlzLnN1Ym1pdEZvcm0sXG4gICAgfVxuICB9XG5cbiAgc2V0Rm9ybVN0YXRlIChuZXdTdGF0ZSwgc2lsZW50KSB7XG4gICAgaWYgKG5ld1N0YXRlICYmIG5ld1N0YXRlLnZhbHVlcyAmJiAhbmV3U3RhdGUuZXJyb3JzKSB7XG4gICAgICBuZXdTdGF0ZS52YWx1ZXMgPSB0aGlzLnByb3BzLnByZVZhbGlkYXRlKFxuICAgICAgICBuZXdTdGF0ZS52YWx1ZXMsXG4gICAgICAgIG5ld1N0YXRlLFxuICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICB0aGlzXG4gICAgICApXG4gICAgICBuZXdTdGF0ZS5lcnJvcnMgPSB0aGlzLnZhbGlkYXRlKG5ld1N0YXRlLnZhbHVlcywgbmV3U3RhdGUsIHRoaXMucHJvcHMpXG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUsICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuc2F2ZVN0YXRlKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMsIHRoaXMpXG4gICAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICB0aGlzLmVtaXRDaGFuZ2UodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZW1pdENoYW5nZSAoc3RhdGUsIGluaXRpYWwpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHN0YXRlLCB0aGlzLnByb3BzLCBpbml0aWFsLCB0aGlzKVxuICB9XG5cbiAgdmFsaWRhdGUgKHZhbHVlcywgc3RhdGUsIHByb3BzKSB7XG4gICAgY29uc3QgZXJyb3JzID0gdGhpcy5wcm9wcy52YWxpZGF0ZShcbiAgICAgIHJlbW92ZU5lc3RlZEVycm9yVmFsdWVzKFxuICAgICAgICB2YWx1ZXMsXG4gICAgICAgIHRoaXMuc3RhdGUgPyB0aGlzLnN0YXRlLm5lc3RlZEVycm9ycyA6IHt9XG4gICAgICApLFxuICAgICAgc3RhdGUsXG4gICAgICBwcm9wcyxcbiAgICAgIHRoaXNcbiAgICApXG4gICAgcmV0dXJuIGNsZWFuRXJyb3JzKGVycm9ycylcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIC4uLnRoaXMuZ2V0QVBJKCksXG4gICAgfVxuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnJlc3QgfSA9IHByb3BzXG4gICAgY29uc3QgcmVzb2x2ZWRDaGlsZCA9XG4gICAgICB0eXBlb2YgY2hpbGRyZW4gPT09ICdmdW5jdGlvbicgPyBjaGlsZHJlbihyZXN0KSA6IGNoaWxkcmVuXG4gICAgcmV0dXJuIHJlc29sdmVkQ2hpbGRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtXG5cbi8vIFV0aWxzXG5cbmZ1bmN0aW9uIGNsZWFuRXJyb3JzIChlcnIpIHtcbiAgaWYgKF8uaXNPYmplY3QoZXJyKSkge1xuICAgIGNvbnN0IHJlc29sdmVkID0gXy5tYXBWYWx1ZXMoZXJyLCBjbGVhbkVycm9ycylcbiAgICBjb25zdCBmb3VuZCA9IF8ucGlja0J5KHJlc29sdmVkLCBkID0+IGQpXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvdW5kKS5sZW5ndGggPyByZXNvbHZlZCA6IHVuZGVmaW5lZFxuICB9XG4gIGlmIChfLmlzQXJyYXkoZXJyKSkge1xuICAgIGNvbnN0IHJlc29sdmVkID0gZXJyLm1hcChjbGVhbkVycm9ycylcbiAgICBjb25zdCBmb3VuZCA9IHJlc29sdmVkLmZpbmQoZCA9PiBkKVxuICAgIHJldHVybiBmb3VuZCA/IHJlc29sdmVkIDogdW5kZWZpbmVkXG4gIH1cbiAgcmV0dXJuIGVyclxufVxuXG4vLyByZW1vdmVOZXN0ZWRFcnJvclZhbHVlcyByZWN1cnNlcyB0aGUgdmFsdWVzIG9iamVjdCBhbmQgdHVybnMgYW55XG4vLyBmaWVsZCB0aGF0IGhhcyBhIHRydXRoeSBjb3JyZXNwb25kaW5nIG5lc3RlZCBmb3JtIGVycm9yIGZpZWxkIGludG8gdW5kZWZpbmVkLlxuLy8gVGhpcyBhbGxvd3MgcHJvcGVybHkgdmFsaWRhdGluZyBhIG5lc3RlZCBmb3JtIGJ5IGRldGVjdGluZyB0aGF0IHVuZGVmaW5lZCB2YWx1ZVxuLy8gaW4gdGhlIHZhbGlkYXRpb24gZnVuY3Rpb25cbmZ1bmN0aW9uIHJlbW92ZU5lc3RlZEVycm9yVmFsdWVzICh2YWx1ZXMsIG5lc3RlZEVycm9ycykge1xuICBjb25zdCByZWN1cnNlID0gKGN1cnJlbnQsIHBhdGggPSBbXSkgPT4ge1xuICAgIGlmIChfLmlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICByZXR1cm4gXy5tYXBWYWx1ZXMoY3VycmVudCwgKGQsIGkpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlY3Vyc2UoZCwgWy4uLnBhdGgsIGldKVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKF8uaXNBcnJheShjdXJyZW50KSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQubWFwKChkLCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlY3Vyc2UoZCwgWy4uLnBhdGgsIGtleV0pXG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAoIV8uaXNPYmplY3QoY3VycmVudCkgJiYgIV8uaXNBcnJheShjdXJyZW50KSAmJiBjdXJyZW50KSB7XG4gICAgICByZXR1cm4gXy5zZXQodmFsdWVzLCBwYXRoLCB1bmRlZmluZWQpXG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50XG4gIH1cbiAgcmVjdXJzZShuZXN0ZWRFcnJvcnMpXG4gIHJldHVybiB2YWx1ZXNcbn1cbiJdfQ==