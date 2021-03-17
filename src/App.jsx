import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { authState } from 'Services/Auth';
import ConsoleNavLayout from 'views/ConsoleNavLayout';
import Home from 'views/Home';
import SignIn from 'views/SignIn';

const App = () => {
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        authState(()=>{
            //wait
        },(user)=>{
            setIsLoggedIn(user);
        })
    }, [])

    const handleAuthState = (isLogin) => {
        setIsLoggedIn(isLogin);
    }
    return (
        <div>
            <Switch>
                <Route path="/signin"> <SignIn handleAuthState={handleAuthState} isLoggedIn={IsLoggedIn}/></Route>
                <PrivateRoute authed={IsLoggedIn} path='/console' component={()=> <ConsoleNavLayout handleAuthState={handleAuthState}/>}></PrivateRoute>
                <Route path="/"><Home/></Route>
            </Switch>
        </div>
    )
}

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
      />
    )
}

export default App
