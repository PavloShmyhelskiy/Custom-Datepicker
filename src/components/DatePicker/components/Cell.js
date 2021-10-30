import React, { useMemo } from 'react'
import moment from 'moment';
import SC from './SC';

function Cell({ date, value, type, displayedMonth}) {

    const isStart = useMemo(() => {
        switch (type) {
            case 'single':
                return moment(date).isSame(moment(value), 'day')
            case 'range':
                return moment(date).isSame(moment(value[0]), 'day')
            case 'multiRange':
                return value.some(range => moment(date).isSame(moment(range[0]), 'day'))
            default: 
                return null;
        }
    }, [value, type, date])

    const isEnd = useMemo(() => {
        switch (type) {
            case 'single':
                return moment(date).isSame(moment(value), 'day')
            case 'range':
                return moment(date).isSame(moment(value[1]), 'day')
            case 'multiRange':
                return value.some(range => moment(date).isSame(moment(range[1]), 'day'))
            default: 
                return null;
        }
    }, [value, type, date])

    const isinRange = useMemo(() => {
        switch (type) {
            case 'single':
                return false
            case 'range':
                return moment(date).isBetween(moment(value[0]), moment(value[1]), 'days', true)
            case 'multiRange':
                return value.some(range => moment(date).isBetween(moment(range[0]), moment(range[1]), 'days', true))
            default: 
                return null;
        }
    }, [value, type, date])

    return (
        <SC 
            isInactive={!moment(date).isSame(moment(displayedMonth), 'month')}
            isStart={isStart}
            isinRange={isinRange}
            isEnd={isEnd}
        >
            {date.getDate()}
        </SC>
    )
}
export default Cell;