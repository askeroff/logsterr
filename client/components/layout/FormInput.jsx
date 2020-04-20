"use strict";
exports.__esModule = true;
var React = require("react");
var FormInput = function (props) { return (<input type={props.inputType} name={props.inputName} id={props.inputId} className="text-field" value={props.inputValue} onChange={props.handleInput}/>); };
FormInput.defaultProps = {
    inputType: 'text',
    inputName: '',
    inputId: '',
    inputValue: '',
    handleInput: null
};
exports["default"] = FormInput;
