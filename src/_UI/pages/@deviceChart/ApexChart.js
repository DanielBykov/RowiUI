import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import {Box, Card, CardHeader} from '@mui/material';
// components
import {BaseOptionChart} from '../../cmp-dev/chart';
import {useMemo} from "react";
import {CELSIUS_PFX, DATE_FORMAT_CHART} from "../../../_DATA/const";

// ----------------------------------------------------------------------

export default function ApexChart({ chartDataItems, title, loading }) {

  const d = useMemo(
    () => {
      const d = {
        temp: [],
        tset: [],
        pmom: [],
        heat: [],
        hhea: [],
        volt: [],
      }
      const timezoneOffset = new Date().getTimezoneOffset()
      chartDataItems.forEach(({createdOnTime, device_data:{
        temp,
        tset,
        pmom,
        heat,
        hhea,
        volt,
      }}) => {
        const t = createdOnTime*1000 - timezoneOffset*60*1000
        temp && d.temp.push([t, Math.round(temp/100 * 10)/10])
        tset && d.tset.push([t, Number(tset/100)])
        pmom && d.pmom.push([t, Math.round(pmom/1000 * 100)/100])
        heat && d.heat.push([t, Number(heat)])
        hhea && d.hhea.push([t, Number(hhea)])
        volt && d.volt.push([t, Number(volt)])
      })
      return d
    },
    [chartDataItems]
  )
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    // fill: { type: chartApiData.map((i) => i.fill) },
    // labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      x: {
        show: true,
        format: 'dd MMM (H:mm)',
      }
    },

  });

  const series = [
    {name: 'Temperature',       type: 'line', data: d.temp},
    {name: 'Temperature Set',   type: 'line', data: d.tset},
    {name: 'Power Consumption', type: 'line', data: d.pmom},
    {name: 'Heat',              type: 'line', data: d.heat},
    {name: 'Memory',            type: 'line', data: d.hhea, hide: true},
  ]
  const yaxis = [
    {title: {text: 'Temperature, '+CELSIUS_PFX,},    min: 0, max: 125, decimalsInFloat: 0},
    {title: {text: undefined,},                 min: 0, max: 125, labels: {show: false}}, //Temperature Set
    {title: {text: 'Power Consumption, kWh',},  opposite: true, decimalsInFloat: 0},
    {title: {text: undefined,},                 labels: {show: false}},// Heat
    {title: {text: 'Memory, %',},               opposite: true,},
  ]

  const options = {
    chart: {
      // height: 500,
      type: 'line',
      toolbar: {
        tools: {
          selection: false, // not working
          pan: false
          // zoomout: false,
        }
      },
    },
    noData: {text: loading? "Loading..." : "No Data"},
    stroke: {
      width: [3],
      curve: 'smooth',
    },
    title: {
      text: title
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      x: {
        show: true,
        format: DATE_FORMAT_CHART,
      },
      y: {
        formatter: (v, {series, seriesIndex, dataPointIndex, w}) => {
          switch (seriesIndex){
            case 0: return `${v} &#8451;`
            case 1: return `${v} &#8451;`
            case 2: return `${v} kWh`
            case 3: return v ? 'ON' : 'OFF'
            case 4: return `${v} %`
          }
          // return `${v}, seriesIndex= ${seriesIndex}`
        }
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM \'yy',
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    },
    yaxis,
    // colors: ['#2E93fA', '#66DA26', '#546E7A', '#efd9e0']
  }

  return (
    <Card>
      <CardHeader
        // title={"Title"}
        // subheader={"subheader"}
      />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          series={series}
          options={options}
          height={500}
        />
      </Box>
    </Card>
  );
}
