import React, {Component} from 'react'
import './Accordeon.css'

class Accordeon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            editing: false,
            open: false
        }
    }

    render() {
        return (
            <div className="accordion">
                {this.props.children}
            </div>
        )
    }
}

export default Accordeon;