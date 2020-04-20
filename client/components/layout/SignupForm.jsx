"use strict";
exports.__esModule = true;
var React = require("react");
var FormInput_1 = require("./FormInput");
var SignupForm = function (props) { return (<form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="email">E-mail:</label>
    <FormInput_1.default inputType="email" inputName="email" inputId="email" inputValue={props.emailValue} handleInput={props.handleEmailChange}/>

    <label htmlFor="password">Password:</label>
    <FormInput_1.default inputType="password" inputName="password" inputId="password" inputValue={props.passwordValue} handleInput={props.handlePasswordChange}/>

    <label htmlFor="invite">Invite:</label>
    <FormInput_1.default inputType="text" inputName="invite" inputId="invite" inputValue={props.inviteValue} handleInput={props.handleInviteChange}/>

    <input type="submit" value="Submit" className="button--submit"/>
  </form>); };
exports["default"] = SignupForm;
