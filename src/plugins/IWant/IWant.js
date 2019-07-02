import React, { Component } from 'react'
import PanelItem from './components/PanelItem'
import './IWant.css';
import Accordeon from './components/Accordeon/Accordeon'
import AccordeonItem from './components/Accordeon/AccordeonItem'


class IWant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pros: '',
            cons: '',
            whatFor: ''
        }
    }
    render() {
        return ( 
            <div id="content" className="container-fluid d-flex h-100 flex-column">
            <div className="row bg-light flex-fill d-flex justify-content-start">

                <div className="col-md-9 col-xs-12">
                        <PanelItem name="content"/>
                </div>
                <div className="col-md-3 col-xs-12">
                    <Accordeon>
                        <AccordeonItem title="What for?">
                            <PanelItem name="whatFor"/>
                        </AccordeonItem>
                        <AccordeonItem title="Pros">
                            <PanelItem name="pros"/>
                        </AccordeonItem>
                        <AccordeonItem title="Cons">
                            <PanelItem name="cons"/>
                        </AccordeonItem>
                    </Accordeon>
                </div>
            </div>
        </div>)
    }
}


export default IWant;