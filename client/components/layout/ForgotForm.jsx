"use strict";
exports.__esModule = true;
var React = require("react");
var FormInput_1 = require("./FormInput");
var ForgotForm = function (props) { return (<form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="email">E-mail:</label>
    <FormInput_1.default inputType="email" inputName="forgot-email" inputId="forgot-email" inputValue={props.emailValue} handleInput={props.handleEmailChange}/>
    <input type="submit" value="Send a Reset" className="button--submit"/>
  </form>); };
ForgotForm.defaultProps = {
    myClassName: '',
    emailValue: '',
    handleEmailChange: null,
    handlePasswordChange: null,
    handleSubmit: null
};
exports["default"] = ForgotForm;
