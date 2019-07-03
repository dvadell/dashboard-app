import { Component } from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        lang: state.LanguageReducer.lang
    }
}

export class Localized extends Component {

    render() {
        let translations = this.props.translations;
        let lang         = this.props.lang;
        let children     = this.props.children;

        return (translations[children] && translations[children][lang]) ?
                translations[children][lang] : 
                'No translation in language "' + lang + '" for "' + children + '"';

    }
}

export default connect(mapStateToProps)(Localized);