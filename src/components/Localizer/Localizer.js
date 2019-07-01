import React, {  Component } from 'react'
import Localized from './Localized'

// Uso:
// import translations from './(module_name).tranlations.js'
// const Localize = Localizer(translations)
// <Localize>I found this cat here</Localize>

const Localizer = (translations) => {
    return (props) => <Localized translations={translations} children={props.children} />
}

export default Localizer;