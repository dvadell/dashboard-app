import React, { Component } from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        lang: state.LanguageReducer.lang
    }
}

export class Localized extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let translations = this.props.translations;
        let lang         = this.props.lang;
        let children     = this.props.children;
        // console.log('LocalizeD: rendering...', translations, lang, children)

        // console.log('LocalizeD: estaría devolviendo...')
        return (translations[children] && translations[children][lang]) ?
                translations[children][lang] : 
                'No translation in language "' + lang + '" for "' + children + '"';

    }
}

export default connect(mapStateToProps)(Localized);