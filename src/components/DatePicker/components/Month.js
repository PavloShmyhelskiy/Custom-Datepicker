import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import Cell from './Cell';

function Month({value, type}) {
    const [displayedMonth, setDisplayedMonth] = useState(type === 'multiRange' ? value[0][0] : value[0] || value);

    const setPrevMonth = useCallback(() => {
        setDisplayedMonth(prev => moment(prev).subtract(1, 'month').toDate());
    }, []);

    const setNextMonth = useCallback(() => {
        setDisplayedMonth(prev => moment(prev).add(1, 'month').toDate());
    }, []);

    const dates = useMemo(() => {
        const startingDate = moment(displayedMonth).startOf('month').startOf('isoWeek');
        const endingDate = moment(displayedMonth).endOf('month').endOf('isoWeek');
        
        let date = startingDate;
        const res = []
        let week = []
        while(!date.isAfter(endingDate, 'date')) {
            week.push(date.toDate());
            date.add(1, 'day');
            if (week.length === 7) {
                res.push(week);
                week = [];
            }
        }

        return res;
    }, [displayedMonth]);

 

    return (
        <div>
            <div>
                <span onClick={setPrevMonth}>{'<'}</span>
                {moment(displayedMonth).format('MMMM YYYY')}
                <span onClick={setNextMonth}>{'>'}</span>
            </div>
            <div>
                <table cellPadding="0px" cellSpacing="0px">
                    <tr>
                        <th>Mon</th>    
                        <th>Tue</th>    
                        <th>Wed</th>    
                        <th>THu</th>    
                        <th>Fri</th>    
                        <th>Sat</th>    
                        <th>Sun</th>    
                    </tr>
                    {dates.map((week, id) => (
                        <tr key={id}>
                            {week.map((day, idx) => (
                                <td key={idx}>
                                    <Cell date={day} value={value} type={type} displayedMonth={displayedMonth}/>
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

Month.propTypes = {
    type:  PropTypes.oneOf(['single', 'range', 'multiRange']).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date), // single date
        PropTypes.arrayOf(PropTypes.instanceOf(Date)), // date range
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))), // date ranges
      ]).isRequired,
};
export default Month;