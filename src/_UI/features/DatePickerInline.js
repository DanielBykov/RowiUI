import React, {useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Card, Container, Grid, Slider} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {MAX_DAYS_RANGE, MIN_DAYS_RANGE, SET_HOURS_FROM, SET_HOURS_TO} from "../../_DATA/const";
import palette from "../theme/palette";

export const dateRangeMonth = (month, year) => {
  const n = new Date()
  month = month ?? n.getMonth()
  year = year ?? n.getFullYear()
  const timeFrom = new Date(year, month, 1)
  timeFrom.setHours(0, 0, 0, 0);
  const timeTo = new Date(year, month+1, 0)
  timeTo.setHours(23, 59, 59, 0);
  return [
    Number(timeFrom.getTime() / 1000).toFixed(0),
    Number(timeTo.getTime() / 1000).toFixed(0)
  ]
}

export const dateRangeDay = (day, month, year) => {
  const n = new Date()
  day = day ?? n.getDate()
  month = month ?? n.getMonth()
  year = year ?? n.getFullYear()
  const timeFrom = new Date(year, month, day)
  timeFrom.setHours(...SET_HOURS_FROM);
  const timeTo = new Date(year, month, day)
  timeTo.setHours(...SET_HOURS_TO);
  return [
    Number(timeFrom.getTime() / 1000).toFixed(0),
    Number(timeTo.getTime() / 1000).toFixed(0)
  ]
}

export const YearPicker = ({activeYear, setActiveYear, disableAll}) => {
  const nowYear = new Date().getFullYear()
  const years = [nowYear-2, nowYear-1, nowYear]
  const handleClick = y => () => {setActiveYear(y)}
  return (
      <Box sx={{mb: 1}}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {years.map(y => (
            <Button
              key={y}
              variant={y===activeYear ? "contained":"outlined"}
              onClick={handleClick(y)}
              disabled={disableAll}
            >{y}</Button>
          ))}
        </ButtonGroup>
      </Box>
  )
}

export const MonthPicker = ({activeMonth, setActiveMonth, activeYear, disableAll}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const handleClick = (i) => () => {setActiveMonth(i)}
  const monthNow = new Date().getMonth()
  const nowYear = new Date().getFullYear()
  return (
    <Box sx={{mb: 1}}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {months.map((month, i) => (
          <LoadingButton
            key={month}
            variant={i===activeMonth ? "contained":"outlined"}
            onClick={handleClick(i)}
            disabled={(activeYear===nowYear && monthNow<i) || disableAll}
            loading={i===activeMonth && disableAll}
          >{month}</LoadingButton>
        ))}
      </ButtonGroup>
    </Box>
  )
}

export const DayPicker = ({activeDayS, setActiveDayS, activeMonth, activeYear, activeDeviceCache, disableAll}) => {

  const [sliderRange, setSliderRange ] = useState([activeDayS[0], activeDayS[1]+1])

  const lastDayOfMonth = new Date(activeYear, activeMonth+1, 0).getDate()
  const lastDay = activeYear === new Date().getFullYear() && activeMonth === new Date().getMonth()
    ? new Date().getDate()
    : lastDayOfMonth

  const handleChangeSlider = (event, newValue) => {setSliderRange(newValue)}
  const minDistance = MIN_DAYS_RANGE; const maxDistance = MAX_DAYS_RANGE;
  const handleChangeSliderMinDistance = (event, newValue, activeThumb) => {
    if ((newValue[0]===sliderRange[0] && newValue[1]===sliderRange[1]) || !Array.isArray(newValue) ) {
      return;
    }

    if(maxDistance && newValue[1] - newValue[0] > maxDistance) return;

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], lastDay+1 - minDistance);
        setSliderRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance+1);
        setSliderRange([clamped - minDistance, clamped]);
      }
    } else {
      setSliderRange(newValue);
    }
  }

  const handleOnCommitted = () => {setActiveDayS([sliderRange[0], sliderRange[1]-1])}

  // States: active, init, loading, loaded-full, loaded-empty
  let daysCashed = activeDeviceCache?.['y'+activeYear]?.['m'+activeMonth]

  const marks = [...Array(lastDay+1).keys()].map((k) => {
    const day = k+1
    const labelVal = k===lastDay && lastDay===lastDayOfMonth ? 1 : day // one more day (current+1 or the 1st day of the next month)

    let color; let fontWeight; let fontSize;
    if(k===lastDay) color = palette.grey["400"]
    if(day>=sliderRange[0] && day<sliderRange[1]) {fontWeight = 700;fontSize = '16px'}

    let loaded = daysCashed?.['d'+day] ? " loaded":""
    let loadedFull = daysCashed?.['d'+day] && daysCashed?.['d'+day].length ? " loaded-full":""

    return {value: day, label:
        <div
          className={`day-label${loaded}${loadedFull}`}
          style={{color, fontWeight, fontSize}}
        >{labelVal}</div>}
  })

  return (
    <Box>
      <Slider
        disabled={disableAll}
        sx={{mt:1}}
        onChange={handleChangeSliderMinDistance}
        value={sliderRange}
        step={null}
        marks={marks}
        min={1}
        max={lastDayOfMonth+1}
        // valueLabelDisplay="auto"
        disableSwap
        onChangeCommitted={handleOnCommitted}
      />

    </Box>
  )
}

export const useDatePickerInline = () => {
  const initActiveDayS = [new Date().getDate(), new Date().getDate()]

  const [activeDayS, setActiveDayS] = useState(initActiveDayS);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());

  // Change a year => set month to the last one
  useEffect(() => {
    if(activeYear === new Date().getFullYear()){
      setActiveMonth(new Date().getMonth())
      setActiveDayS(initActiveDayS) // Fix. Dec-2021 to Dec-2022(current) => set days in future
    } else {
      setActiveMonth(11) // Dec
    }
  },[activeYear])

  // Change a month => set days to the last 2 ones
  useEffect(() => {
    // Current month
    if(activeYear === new Date().getFullYear() && activeMonth === new Date().getMonth()){
      setActiveDayS(initActiveDayS)
    // Other months
    } else {
        const lastDayOfMonth = new Date(activeYear, activeMonth+1, 0).getDate()
        setActiveDayS([lastDayOfMonth, lastDayOfMonth])
    }
  },[activeMonth])

  const DatePickerInline = ({loadingDDB, activeDeviceCache}) => {
    return (
      <div className="date-picker-d256">
        <YearPicker {...{activeYear, setActiveYear, disableAll: loadingDDB}} />
        <MonthPicker {...{activeMonth, setActiveMonth, activeYear, disableAll: loadingDDB}} />
        <DayPicker {...{activeDayS, setActiveDayS, activeMonth, activeYear, activeDeviceCache, disableAll: loadingDDB}} />
      </div>
    )
  }

  return {
    activeDayS,
    activeMonth,
    activeYear,
    DatePickerInline
  }
}





