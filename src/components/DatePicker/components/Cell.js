import React, { useMemo, useState , useCallback } from 'react'
import moment from 'moment';
import SC from './SC';

function Cell({ date, value, type, displayedMonth, setValue}) {
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

    const onClickHandler = useCallback((event) => {
        switch (type) {
            case 'single':
                return setValue(date);
            case 'range':
                if(value[1]) setValue([date, null]); else setValue([value[0], date].sort((a, b) => +a - +b));
                return
            case 'multiRange':
                if (event.ctrlKey && value[value.length - 1][1]) {
                    setValue([...value, [date, null]])
                } else {
                    if(value[value.length - 1][1]) setValue([[date, null]]); else {
                        const newValues = [...value];
                        newValues[newValues.length - 1] = [value[value.length - 1][0], date].sort((a, b) => +a - +b)
                        setValue(newValues);
                    }
                }
                return null
            default: 
                return null;
        }
    }, [value, setValue, type, date])

    return (
        <SC 
            isInactive={!moment(date).isSame(moment(displayedMonth), 'month')}
            isStart={isStart}
            isinRange={isinRange}
            isEnd={isEnd}
            onClick={onClickHandler}
        >
            {date.getDate()}
        </SC>
    )
}
export default Cell;