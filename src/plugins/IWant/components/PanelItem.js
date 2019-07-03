import React, {Component} from 'react'
import dompurify from 'dompurify'
import { wtToHtml } from '../../../wikiText';


class PanelItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            editing: false,
        }
    }

    toggleEdit = (event) => {
        if (this.state.editing) {
            // We were editing and now we pressed the upload icon -> save
            console.log('Saving content of ', this.props.name, ':', this.state.content)
            this.props.doSave(this.state.content)
        }
        this.setState({ editing: !this.state.editing})
    }

    updateContent = event => {console.log(event.target.value); this.setState({content: event.target.value})};
    toggleOpen = () => this.state.editing ? this.setState({open: true}) : this.setState({ open: !this.state.open})

    render() {
        let name = this.props.name;
        return (
            <div id={name}>
                <span id="pros-icon" onClick={this.toggleEdit} className={"fa " + (this.state.editing ? "fa-upload" : "fa-edit")}></span>
            {
                    ! this.state.editing ?  <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(wtToHtml(this.state.content))}} /> : (
                                <textarea   name="{name}" placeholder="Write!" value={this.state.content} 
                                            className="form-control mousetrap markup" rows="20"
                                            onChange={this.updateContent}></textarea>
                    )
            }
            </div>
        )}
}

export default PanelItem;