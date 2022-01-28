import React, {useContext} from 'react';
import {Context} from "../context";

const Highlight = ({str, filter}) => {
    if(!str) return null
    if(!filter) return str

    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)

    if (matchValue) {
        return str.split(regexp).map((substring, index, array) => {
            if (index < array.length - 1) {
                const foundSubstring = matchValue.shift()
                console.log(substring)
                return (<>{substring}<span className="hightlight">{foundSubstring}</span></>);
            }
            return substring
        })
    }
    return str
};

export default Highlight;