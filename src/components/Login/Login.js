import React, { useState , useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  return {value: '',isValid:false}
};


const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] =useReducer(emailReducer, {value:'', isValid:false,});

   
 useEffect(()=>{
  console.log("Effect running");
  return () =>{
    console.log("effect cleanUp")
  }
 },[])

    useEffect(()=>{
      const identifier =setTimeout(()=>{
        console.log("Checking for validity")
        setFormIsValid(
          emailState.value.includes('@') && enteredPassword.trim().length > 6);
        },500);
        //cleanup function
    return ()=>{
      console.log("CleanUp");
      clearTimeout(identifier);
    }
      },[emailState.value, enteredPassword]);
  
    
    
      
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }
    const passwordChangeHandler = (event) => {
      setEnteredPassword(event.target.value);
    }
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.isValid);
  };
 
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};



export default Login;
