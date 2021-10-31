import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ValueDisplayer from './ValueDisplayer/ValueDisplayer';
import Month from './Month/Month';
import moment from 'moment';
import styled from "styled-components";

const Apply = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 85px;
  width: 4rem;
  background: transparent;
  color: blue;
  cursor: pointer;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
  `
  const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 0;
  margin: 0.5rem 0rem;
  width: 82px;
  background: transparent;
  color: aqua;
  cursor: pointer;
  border-style: none;
  `
  const Span = styled.span`
  display: flex;
  border-top: 2px solid gray;
  width: 245px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid gray;
  background: white;
  color: aqua;
  `
  const P = styled.p`
  margin: 0;
  color: blue;
  width: 245px
  `
function DatePicker({ type, value, onChange}) {
    const [isOpen, setIsOpen] = useState(false);
    const [local, setLocal] = useState(value);

    const toggleDatePicker = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);
    useEffect(() => {
        setLocal(value);
    },[value])
    const isRange = (type === "range");
    const isMultiRange = (type === "multiRange");
    return (
        <>
            <ValueDisplayer type={type} value={local} onClick={toggleDatePicker}/>
            {isOpen && <Month type={type} value={local} setValue={setLocal}/>}
            {isOpen && isRange && <Span><Button onClick={() => setLocal([moment().subtract(1, 'weeks').startOf('isoWeek').toDate(), moment().subtract(1, 'weeks').endOf('isoWeek').toDate()])}>Last week</Button>
            <Button onClick={() => setLocal([moment().subtract(1, 'M').startOf('month').toDate(), moment().subtract(1, 'months').endOf('month').toDate()])}>Last month</Button>
            <Button onClick={() => setLocal([moment().subtract(3, 'M').startOf('quarter').toDate(), moment().subtract(3, 'months').endOf('quarter').toDate()])}>Last quarter</Button>
            </Span>}
            {isOpen && isMultiRange && <P>To add more than one value press Ctrl</P>}
            {isOpen && <Apply onClick={() => onChange(local)}>Apply</Apply>}
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