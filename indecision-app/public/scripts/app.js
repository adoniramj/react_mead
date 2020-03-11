'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.handleDeleteAllOptions = _this.handleDeleteAllOptions.bind(_this);
    _this.addOption = _this.addOption.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    _this.state = {
      subtitle: 'Put your life in the hands of a computer!',
      options: props.options
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'handleDeleteAllOptions',
    value: function handleDeleteAllOptions() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      //console.log('delete option', option)
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return option !== optionToRemove;
          })
        };
      });
    }
  }, {
    key: 'addOption',
    value: function addOption(newOption) {
      if (!newOption) {
        return 'Empty strings are not allowed!';
      } else if (this.state.options.indexOf(newOption) > -1) {
        return 'This option already exists!';
      }
      this.setState(function (prevState) {
        return { options: prevState.options.concat(newOption) };
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: this.state.subtitle }),
        React.createElement(Action, { options: this.state.options }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteAllOptions: this.handleDeleteAllOptions,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, { addOption: this.addOption })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
  options: ['Option one']
};
var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'Indecision App!'
};

var Action = function Action(props) {
  //console.log('The Action component has the following', props)

  var handlePick = function handlePick() {
    var ranNum = Math.floor(Math.random() * props.options.length);
    alert(props.options[ranNum]);
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        disabled: props.options.length === 0,
        onClick: handlePick },
      'What should I do?'
    )
  );
};

var Options = function Options(props) {
  console.log('The Options component has the following', props);
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        disabled: props.options.length === 0,
        onClick: props.handleDeleteAllOptions
      },
      'Remove all options'
    ),
    props.options.map(function (option) {
      return React.createElement(Option, {
        key: option,
        optionText: option,
        handleDeleteOption: props.handleDeleteOption
      });
    })
  );
};

var Option = function Option(props) {
  console.log('The Option component has the following', props);
  return React.createElement(
    'div',
    null,
    React.createElement(
      'span',
      null,
      props.optionText
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.handleDeleteOption(props.optionText);
        } },
      'Remove'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'handleAddOption',
    value: function handleAddOption(event) {
      event.preventDefault();
      var option = event.target.elements.option.value.trim();
      var error = this.props.addOption(option);
      this.setState(function () {
        return { error: error };
      });

      event.target.elements.option.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption },
          React.createElement('input', { type: 'text', name: 'option', autoComplete: 'off' }),
          React.createElement(
            'button',
            { type: 'submit' },
            'Add an option'
          )
        ),
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

var appRoot = document.getElementById('app');
ReactDOM.render(React.createElement(IndecisionApp, { options: ['ten', 'twenty'] }), appRoot);
