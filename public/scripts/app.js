'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Indecisonapp = function (_React$Component) {
    _inherits(Indecisonapp, _React$Component);

    function Indecisonapp(props) {
        _classCallCheck(this, Indecisonapp);

        var _this = _possibleConstructorReturn(this, (Indecisonapp.__proto__ || Object.getPrototypeOf(Indecisonapp)).call(this, props));

        _this.handleDeleteAll = _this.handleDeleteAll.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.deleteIndividualEntry = _this.deleteIndividualEntry.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(Indecisonapp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // catching bad data
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return {
                            options: options
                        };
                    });
                }
            } catch (e) {
                // DO NOTING
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                console.log('did update');
                var jsonData = JSON.stringify(this.state.options);
                localStorage.setItem('options', jsonData);
            }
        }
    }, {
        key: 'handleDeleteAll',
        value: function handleDeleteAll() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var lengthArray = this.state.options.length;
            if (lengthArray > 0) {
                var pickedValueIndex = Math.floor(Math.random() * lengthArray);
                var pickedValue = this.state.options[pickedValueIndex];
                alert(pickedValue);
            }
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(currentOption) {
            if (!currentOption) {
                return 'add valid item';
            } else if (this.state.options.indexOf(currentOption) > -1) {
                return 'this item already exist';
            }
            var modArray = this.state.options.concat(currentOption);
            this.setState(function (prevState) {
                // prevState.options.push(currentOption)
                return {
                    options: modArray
                };
            });
        }
    }, {
        key: 'deleteIndividualEntry',
        value: function deleteIndividualEntry(optionText) {
            // this.state.options.splice(index,1)
            // const modArr = this.state.options
            var modArr = this.state.options.filter(function (el) {
                return el !== optionText;
            });
            this.setState(function () {
                return {
                    options: modArr
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = "Indecision App";
            var subtitle = " Put ur life in my hand";
            var options = this.state.options;

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(Action, { hasOption: options.length > 0 ? true : false, handlePick: this.handlePick }),
                React.createElement(Options, { options: this.state.options, handleDeleteAll: this.handleDeleteAll, deleteIndividualEntry: this.deleteIndividualEntry }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return Indecisonapp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            ' ',
            props.title
        ),
        React.createElement(
            'h2',
            null,
            ' ',
            props.subtitle,
            ' '
        )
    );
};

var Action = function Action(props) {
    var hasOption = props.hasOption,
        handlePick = props.handlePick;


    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: !hasOption, onClick: handlePick },
            'What should i do ?'
        )
    );
};

var Options = function Options(props) {
    var options = props.options,
        deleteIndividualEntry = props.deleteIndividualEntry;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteAll },
            'Remove all'
        ),
        options.map(function (el, index) {
            return React.createElement(Option, { optionText: el, key: el, deleteIndividualEntry: deleteIndividualEntry, index: index, options: options });
        })
    );
};

var Option = function (_React$Component2) {
    _inherits(Option, _React$Component2);

    function Option() {
        _classCallCheck(this, Option);

        return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
    }

    _createClass(Option, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                options = _props.options,
                optionText = _props.optionText,
                deleteIndividualEntry = _props.deleteIndividualEntry;

            return React.createElement(
                'div',
                null,
                optionText,
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return deleteIndividualEntry(optionText);
                        } },
                    'Remove'
                )
            );
        }
    }]);

    return Option;
}(React.Component);

var AddOption = function (_React$Component3) {
    _inherits(AddOption, _React$Component3);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this3 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this3.handleAddOption = _this3.handleAddOption.bind(_this3);
        _this3.state = {
            error: undefined
        };
        return _this3;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);
            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error ? this.state.error : null,
                React.createElement('br', null),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        ' Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(Indecisonapp, null), document.getElementById('root'));
