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

    doSave(name) { return (content) => {
            console.log('doSave', name, content)
        }   
    }

    render() {
        return ( 
            <div id="content" className="container-fluid d-flex h-100 flex-column">
            <div className="row bg-light flex-fill d-flex justify-content-start">

                <div className="col-md-9 col-xs-12">
                        <PanelItem name="content" doSave={this.doSave('content')}/>
                </div>
                <div className="col-md-3 col-xs-12">
                    <Accordeon>
                        <AccordeonItem title="What for?">
                            <PanelItem name="whatFor" doSave={this.doSave('whatFor')}/>
                        </AccordeonItem>
                        <AccordeonItem title="Pros">
                            <PanelItem name="pros" doSave={this.doSave('pros')}/>
                        </AccordeonItem>
                        <AccordeonItem title="Cons">
                            <PanelItem name="cons" doSave={this.doSave('cons')}/>
                        </AccordeonItem>
                    </Accordeon>
                </div>
            </div>
        </div>)
    }
}


export default IWant;