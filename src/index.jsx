//importing react to use library
import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'react-bootstrap';

// import { ComponentName } from '[path to the component file]'; if using 'default' export, then no need for {}
import MainView from './components/main-view/main-view';

//importing a file for bundle
import './index.css';
import { render } from 'react-dom';


//Main compoenent. 
//'MyFlixApplication' is the name of the class.
//A class should always extend the component class from React, hence React.Component
class MyFlixApplication extends React.Component {
    render() { //the class has to implement a render method that either returns html or null
        return (
             // use the short format '< />',due to no nested elements
                <MainView />
        );
    }
}

//Finds the root of your app
let container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);