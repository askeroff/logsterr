"use strict";
exports.__esModule = true;
var React = require("react");
var FormInput_1 = require("./FormInput");
var ResetForm = function (props) { return (<form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="password">Your New Password:</label>
    <FormInput_1.default inputType="password" inputName="password-email" inputId="password-email" inputValue={props.passwordValue} handleInput={props.handlePasswordChange}/>
    <input type="submit" value="Change Password" className="button--submit"/>
  </form>); };
ResetForm.defaultProps = {
    myClassName: '',
    passwordValue: '',
    handlePasswordChange: null,
    handleSubmit: null
};
exports["default"] = ResetForm;
