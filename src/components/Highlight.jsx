import React from 'react';

const Highlight = ({str, filter}) => {
    if(!str) return null;
    if(!filter) return str;

    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);

    if (matchValue) {
        return str.split(regexp).map((substring, index, array) => {
            if (index < array.length - 1) {
                const foundSubstring = matchValue.shift();
                return (<>{substring}<span className="highlight">{foundSubstring}</span></>);
            };
            return substring;
        });
    };
    return str;
};

export default Highlight;