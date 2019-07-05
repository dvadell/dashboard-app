import React, { Component, createRef } from 'react'
import Mousetrap from 'mousetrap'
import PanelItem from '../../components/PanelItem/PanelItem'
import './Project.css';
import Accordeon from '../../components/Accordeon/Accordeon'
import AccordeonItem from '../../components/Accordeon/AccordeonItem'

const API_URL='http://localhost:9000/api/v1/'


class IWant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.match.params.title || 'Página Principal',
            pros: '',
            cons: '',
            whatFor: '',
            description: ''
        }
        console.log('constructed! title is', this.state.title)
    }

    myRefs = {
        pros: createRef(),
        cons: createRef(),
        whatFor: createRef(),
        description: createRef()
    }

    doSave(name) { return (content) => {
            console.log('doSave', name, content)
            this.setState({ [name]: content })
        }   
    }

    componentDidMount() {
        console.log('mounted! title is', this.state.title)
        let title = this.state.title;

        Mousetrap.bind(["ctrl+s", "meta+s"], e => {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            // Get all the state, everywhere
            let newState = {}
            Object.keys(this.myRefs).map( panelName => {
                newState[panelName] = this.myRefs[panelName].current.state.content
            })
            this.setState({...newState})

            if (this.state.description === undefined) return false;  // Just a safeguard
            fetch(API_URL + 'quieros/' + title, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    cons: this.state.cons,
                    pros: this.state.pros,
                    description: this.state.description,
                    title: this.state.title,
                    whatFor: this.state.whatFor
                })
            })
            .then(res => console.log(res))
        });

        fetch(API_URL + 'quieros/' + title)
            .then(res => res.json())
            .then( json => { console.log('new data:') ;  this.setState({...json})})
            .catch( err => this.setState({err}))
    }

    render() {
        console.log('rendering! title is', this.state.title)
        return ( 
            <div id="content" className="container-fluid d-flex h-100 flex-column">
            <div className="row bg-light flex-fill d-flex justify-content-start">

            <div className="col-md-3 col-xs-12">
                    <Accordeon>
                        <AccordeonItem title="What do I need?">
                            <PanelItem name="whatFor" ref={this.myRefs.whatFor}
                                content={this.state.whatFor} doSave={this.doSave('whatFor')}/>
                        </AccordeonItem>
                        <AccordeonItem title="Next Steps">
                            <PanelItem name="pros" ref={this.myRefs.pros}
                                content={this.state.pros} doSave={this.doSave('pros')}/>
                        </AccordeonItem>
                    </Accordeon>
                </div>

                <div className="col-md-6 col-xs-12">
                    <h2>{this.state.title}</h2>
                        <PanelItem name="description" 
                            ref={this.myRefs.description}
                            doSave={this.doSave('description')}
                            content={this.state.description}
                        />
                </div>
                <div className="col-md-3 col-xs-12">
                    <Accordeon>
                        <AccordeonItem title="What for?">
                            <PanelItem name="whatFor" ref={this.myRefs.whatFor}
                                content={this.state.whatFor} doSave={this.doSave('whatFor')}/>
                        </AccordeonItem>
                        <AccordeonItem title="Pros">
                            <PanelItem name="pros" ref={this.myRefs.pros}
                                content={this.state.pros} doSave={this.doSave('pros')}/>
                        </AccordeonItem>
                        <AccordeonItem title="Cons">
                            <PanelItem name="cons" ref={this.myRefs.cons} 
                                content={this.state.cons} doSave={this.doSave('cons')}/>
                        </AccordeonItem>
                    </Accordeon>
                </div>
            </div>
        </div>)
    }
}


export default IWant;