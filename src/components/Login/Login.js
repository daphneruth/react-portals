import React, { useState , useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'User_Input'){
    return {value: action.val,isValid:action.val.includes('@')};
  }
  if(action.type === 'Input_Blur'){
    return {value: state.value, isValid:action.val.includes('@')};
  }
  return {value: '',isValid:false}
};
 const passwordReducer =(state, action) => {if(action.type === 'User_Input'){
  return {value: action.val,isValid:action.val.trim().length > 6};
}
if(action.type === 'Input_Blur'){
  return {value: state.value, isValid:action.val.trim().length > 6};
}
return {value: '',isValid:false}
};


const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] =useReducer(emailReducer, {value:'', isValid:false,});
const[passwordState, dispatchPassword] =useReducer(passwordReducer, {value:'', isValid:false,});
   
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
          emailState.value.includes('@') && enteredPassword.isValid);
        },500);
        //cleanup function
    return ()=>{
      console.log("CleanUp");
      clearTimeout(identifier);
    }
      },[emailState.value, enteredPassword]);
  
    
    
      
  const emailChangeHandler = (event) => {
   // setEnteredEmail(event.target.value);
   dispatchEmail({type:'User_Input', val:event.target.vaue});
  setFormIsValid(
    event.target.value.includes('@') && passwordState.isValid
  );

  }
  
    const passwordChangeHandler = (event) => {
     // setEnteredPassword(event.target.value);
     dispatchEmail({type:'User_Input', val:event.target.vaue});
    }
  const validateEmailHandler = () => {
   //setEmailIsValid(emailState.isValid);
   dispatchEmail({type:'Input_Blur'});

   setFormIsValid(
    emailState.isValid && event.target.value.trim().length > 6
    );
   
  };
 
  const validatePasswordHandler = () => {
   // setPasswordIsValid(enteredPassword.trim().length > 6);
   dispatchEmail({type:'Input_Blur'});

  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
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
