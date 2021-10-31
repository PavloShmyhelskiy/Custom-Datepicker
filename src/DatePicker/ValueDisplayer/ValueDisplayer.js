import moment from 'moment';
import React from 'react'
import PropTypes from 'prop-types'

import Input from './Input/Input';


function ValueDisplayer({ value, type, onClick }) {
    switch (type) {
        case 'single':
            return <Input onClick={onClick}>{moment(value).format('DD-MM-YYYY')}</Input>;
        case 'range':
            return (
                <div onClick={onClick}>
                    <Input>{moment(value[0]).format('DD-MM-YYYY')}</Input>
                    &nbsp;_&nbsp;
                    <Input>{moment(value[1]).format('DD-MM-YYYY')}</Input>
                </div>
            )
        case 'multiRange':

            return (
                <div onClick={onClick}>
                    {value.map((range, idx) => (
                        <div key={idx}>
                            <Input>{moment(range[0]).format('DD-MM-YYYY')}</Input>
                            &nbsp;_&nbsp;
                            <Input>{moment(range[1]).format('DD-MM-YYYY')}</Input>
                        </div>
                    ))}
                </div>
            )
        default: 
            return null;
    }
}

ValueDisplayer.propTypes = {
    type: PropTypes.oneOf(['single', 'range', 'multiRange']).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date), // single date
        PropTypes.arrayOf(PropTypes.instanceOf(Date)), // date range
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))), // date ranges
    ]).isRequired,
    onClick: PropTypes.func
}

export default ValueDisplayer;