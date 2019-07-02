import React, {Component} from 'react'

class AccordeonItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    toggleOpen = () =>  { console.log('toggleOpen', this.state.open); this.setState({ open: !this.state.open})}

    render() {
        let title = this.props.title;
        return (
            <section
                    className={"accordion-item" + (this.state.open ? " accordion-item--default" : '')} >
                <h2><span onClick={this.toggleOpen}>{title}</span></h2>
                <div className="accordion-item-content">
                    {this.props.children}
                </div>
                
            </section>
        )
    }
}

export default AccordeonItem;