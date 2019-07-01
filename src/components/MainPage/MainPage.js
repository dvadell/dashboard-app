import React, { Component } from 'react';
import IWant from '../../plugins/IWant/IWant';


class MainPage extends Component {

    render() {
        return (<div id="App">
            <div className="tc">
                <IWant></IWant>
            </div>
        </div>)   
    }
}

export default MainPage;