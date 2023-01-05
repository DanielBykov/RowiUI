import React, {useMemo} from "react";
import {Grid} from "@mui/material";
import {TotalWidget} from "./TotalWidget";
import {CELSIUS_PFX, DATE_FORMAT_CHART} from "../../../_DATA/const";
import {format} from "date-fns";

export const TotalWidgetS = ({chartDataItems=[]}) => {
  const [power, maxTemp, maxTempDate, sumTemp, minTemp, minTempDate] = useMemo( () =>
    chartDataItems.reduce(([power, maxTemp, maxTempDate, sumTemp, minTemp, minTempDate], {device_data:{pmom, temp}, createdOnTime}) => {
      power = power + Number(pmom/1000)
      temp        = Number(temp/100)
      sumTemp     = sumTemp + temp

      maxTempDate = maxTemp < temp ? createdOnTime : maxTempDate
      maxTemp     = maxTemp < temp ? temp : maxTemp

      minTempDate = minTemp > temp ? createdOnTime : minTempDate
      minTemp     = minTemp > temp ? temp : minTemp

      return [power,maxTemp,maxTempDate, sumTemp,minTemp, minTempDate]
    }, [0,0,0,0,1000,0]) , [chartDataItems])

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <TotalWidget
          total={power}
          title={'Power consumption over selected period, kWh'}
          color={'warning'}
          icon={'material-symbols:power-rounded'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TotalWidget
          total={maxTemp}
          title={`Max temperature, ${CELSIUS_PFX} \n ${maxTempDate ? format(new Date(maxTempDate*1000), DATE_FORMAT_CHART):"\n"} `}
          color={'error'}
          icon={'carbon:temperature-max'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TotalWidget
          total={sumTemp/chartDataItems.length}
          title={`Ave temperature, ${CELSIUS_PFX} \n\n`}
          color={'success'}
          icon={'carbon:temperature'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TotalWidget
          total={minTemp}
          title={`Min temperature, ${CELSIUS_PFX} \n ${minTempDate ? format(new Date(minTempDate*1000), DATE_FORMAT_CHART):"\n" } `}
          color={'info'}
          icon={'carbon:temperature-min'}
        />
      </Grid>
    </>
  )
}
