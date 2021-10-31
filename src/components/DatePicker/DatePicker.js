import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ValueDisplayer from './components/ValueDisplayer';
import Month from './components/Month';

function DatePicker({ type, value, onChange}) {
    const [isOpen, setIsOpen] = useState(false);
    const [local, setLocal] = useState(value);

    const toggleDatePicker = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);
    useEffect(() => {
        setLocal(value);
    },[value])

    return (
        <>
            <ValueDisplayer type={type} value={local} onClick={toggleDatePicker}/>
            {isOpen && <Month type={type} value={local} setValue={setLocal}/>}
            {isOpen && <button onClick={() => onChange(local)}>Apply</button>}
        </>
    )
}

DatePicker.propTypes = {
    type:  PropTypes.oneOf(['single', 'range', 'multiRange']).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date), // single date
        PropTypes.arrayOf(PropTypes.instanceOf(Date)), // date range
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))), // date ranges
      ]).isRequired,
    onChange: PropTypes.func.isRequired,
}
export default DatePicker;