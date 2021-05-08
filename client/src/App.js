import React from "react";
import "./App.css";
import {Component} from 'react';
import Landing from './components/Landing'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'


class App extends Component{

  constructor(props) {
    super(props);
    this.state = {data:""};
  }
  componentDidMount() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => this.setState({data:data.message}));
  }
  render(){
    const content = () => {
      
      return (
        <BrowserRouter>  
          <Switch>
            <Route exact path='/login/'/>
            <Route exact path='/' component={Landing} />
            <Redirect from='*' to='/'/>
          </Switch>
        </BrowserRouter>
      )
    }
    return (
      <main>
        {content()}
        
      </main>
    );

  }

}

export default App;