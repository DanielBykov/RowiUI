// @mui
import {Box, Card, CardActionArea, CardContent, Container, Grid, Typography} from '@mui/material';
// components
import Page from '../../cmp/Page';
// sections
import React, {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {useContextDataUi} from "../../../_DATA/context";
import {dateRangeDay, useDatePickerInline} from "../../features/DatePickerInline";
import ApexChart from "./ApexChart";
import {deviceDataFromDDBStatus_Mock} from "../../../_DATA/mock/mockApiCalls";
import {chartApiDataCacheMock} from "../../../_DATA/mock/mockApiData";
import {TotalWidgetS} from "./TotalWidgetS";
import {DeviceCard} from "./DeviceCard";
import {format} from "date-fns";
import {DATE_FORMAT_CHART, DATE_FORMAT_TABLE, MAX_DAYS_RANGE, SET_HOURS_TO} from "../../../_DATA/const";
import {useFetchDeviceData} from "./useFetchDeviceData";
import {LoadingButton} from "@mui/lab";
import Iconify from "../../cmp/Iconify";

// ----------------------------------------------------------------------

export default function DeviceChart() {
  const { loading:loadingDataUI, deviceItems=[] } = useContextDataUi()

  // Device cards state
  const [activeDevice, setActiveDevice ] = useState(null)

  // Date-picker
  const {activeDayS, activeMonth, activeYear, DatePickerInline} = useDatePickerInline()

  // Get device data from API (AWS Dynamo DB)
  const { loadDDB, chartDataItems, chartApiDataCache, getLatest} = useFetchDeviceData(activeDayS, activeMonth, activeYear, activeDevice)

  // Set the first device item
  useEffect(() => {
    if(activeDevice===null && deviceItems.length > 0) {
      setActiveDevice(deviceItems[0].deviceID)
    }
  }, [deviceItems])

  const activeDeviceName = deviceItems.find(d=>d.deviceID===activeDevice)?.name

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Device Chart
        </Typography>
        <Grid container spacing={3}>

          {!deviceItems.length
            ? <NoDevice msg={loadingDataUI ? "Loading data..." : "No devices. Please add a new one"}/>
            :
            <>
              {deviceItems.map(({deviceID, name}) => {
                // Styles for active card or the first card if activeCard is null
                return (
                  <DeviceCard
                    key={deviceID}
                    deviceID={deviceID}
                    name={name}
                    setActiveDevice={setActiveDevice}
                    isActiveCard={deviceID === activeDevice}
                  />)})}

              {/*<DatePickerCustomD256 />*/}
              <Grid item xs={12} sm={12} md={12}>
                <DatePickerInline loadingDDB={loadDDB} activeDeviceCache={chartApiDataCache[activeDevice]}/>
              </Grid>

              <Grid item xs={12} sm={12} md={6} sx={{pt:0}}>
                <Typography variant="subtitle2">
                  Selected Period:{" "}
                  {format(new Date(activeYear, activeMonth, activeDayS[0]), DATE_FORMAT_CHART)} ->
                  {format(new Date(activeYear, activeMonth, activeDayS[1]).setHours(...SET_HOURS_TO), DATE_FORMAT_CHART)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{display: "flex", justifyContent: "end"}}>
                <LoadingButton
                  size="small"
                  variant="outlined"
                  onClick={() => {getLatest()}}
                  disabled={loadDDB}
                  loading={loadDDB}
                  startIcon={<Iconify icon={'material-symbols:autorenew'} width={18} height={18} />}
                >{"Update"}</LoadingButton>
                {/*<Button*/}
                {/*  color={}*/}
                {/*  // variant={"outlined"}*/}
                {/*>Cancel</Button>*/}
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <ApexChart chartDataItems={chartDataItems} title={activeDeviceName} loading={loadingDataUI || loadDDB}/>
              </Grid>

              {/*<Grid item xs={12} sm={12} md={12}>*/}
              {/*  <HighChartReact chartDataItems={chartDataItems} deviceName={deviceName} loadDDB={loadDDB}/>*/}
              {/*</Grid>*/}
            </>
          }

          {/*<Grid item xs={12} sm={12} md={12}>*/}
          {/*  <HighChart chartApiData={chartApiData}/>*/}
          {/*</Grid>*/}

          <TotalWidgetS chartDataItems={chartDataItems}/>

        </Grid>
      </Container>
    </Page>
  );
}

const NoDevice = ({msg}) => (
  <Grid item xs={12} sm={12} md={12}>
    <Typography variant="subtitle1">
      {msg}
    </Typography>
  </Grid>
)



