import React from "react";
import Dashboard from "./dashboard/Dashboard";
import {Route} from 'react-router-dom';

class App extends React.Component{

    render(){
        return (
            <Route path="/" component={Dashboard}/>
        )
    }
}

export default App;