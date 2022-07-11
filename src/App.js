import React, { useState ,useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const userInputInfo = localStorage.getItem('isLoggedIn');

   if (userInputInfo === '1'){
    setIsLoggedIn(true);
   }

  }, [isLoggedIn]);
  
  const loginHandler = (email, password) => {
    //storing in local storage

    localStorage.setItem('isLoggedIn', '1');
   setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

   
   
  
  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}


export default App;
