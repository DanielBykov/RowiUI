import {dateRangeDay} from "../../features/DatePickerInline";
import axios from "axios";
import {useEffect, useState} from "react";

export const useFetchDeviceData = (activeDayS, activeMonth, activeYear, activeDevice) => {
  const [loadDDB, setLoadDDB ] = useState(false)
  const [chartDataItems, setChartDataItems ] = useState([])
  const [chartApiDataCache, setChartApiDataCache ] = useState({})

  useEffect(async () => {
    if(!activeDevice) return

      const periodDaysItems = await chartDataItemsPopulate({
        activeDayS, activeMonth, activeYear, activeDevice,
        chartApiDataCache, setChartApiDataCache,
        setLoadDDB
      })

      setChartDataItems(periodDaysItems)
  }, [activeDayS, activeDevice])

  const getLatest = async () => {
    // Get from API for today (noCache)
    await chartDataItemsPopulate({
      activeDayS: [new Date().getDate(), new Date().getDate()],
      activeMonth, activeYear, activeDevice,
      chartApiDataCache, setChartApiDataCache,
      setLoadDDB, noCache: true
    })

    // Get from cache for chosen period
    const periodDaysItems = await chartDataItemsPopulate({
      activeDayS, activeMonth, activeYear, activeDevice,
      chartApiDataCache, setChartApiDataCache
    })
    setChartDataItems(periodDaysItems)
  }

  return {
    loadDDB,
    chartDataItems,
    chartApiDataCache,
    getLatest
  }
}

const chartDataItemsPopulate = async (s) => {
  const {
    activeDayS, activeMonth, activeYear, activeDevice,
    chartApiDataCache, setChartApiDataCache,
    setLoadDDB,
    noCache=false
  } = s
  let periodDaysItems = []
  const [d1,d2] = activeDayS

  // Mock Data
  // periodDaysItems = await deviceDataFromDDBStatus_Mock(activeDevice)

  if(!periodDaysItems.length) {

    // for (let day = d1; day <= d2; day++) {
    for (let day = d2; day >= d1; day--) {
      // Check cache
      const cashItems = noCache
        ? undefined
        : chartApiDataCache[activeDevice]?.['y' + activeYear]?.['m' + activeMonth]?.['d' + day]
      // const cashItems = chartApiDataCacheMock[activeDevice]?.['y' + activeYear]?.['m' + activeMonth]?.['d' + day]

      // Data from cache
      if (cashItems) {
        console.log('d256 Data from cache:',)
        // periodDaysItems = [...periodDaysItems, ...cashItems]
        periodDaysItems = [...cashItems, ...periodDaysItems]

      } else {
        console.log('d256 Data from API:',)
        let i = 1
        let lastKey = 0
        let items = []
        const maxApiRequests = 1
        const limitPerRequest = 0

        try {
          setLoadDDB(true)

          // API
          do {
            const {Items: newItems = [], LastEvaluatedKey} = await getDeviceDataFromDDBStatus(
              activeDevice, day, activeMonth, activeYear, limitPerRequest, lastKey
            )
            items = [...items, ...newItems]
            i++
            lastKey = LastEvaluatedKey?.createdOnTime
          } while (lastKey && i <= maxApiRequests)

          console.log('d256 API Items count (for period):', items.length)

          // Set cache
          setChartApiDataCache(({...p}) => {
            if (!p[activeDevice]) p[activeDevice] = {}
            if (!p[activeDevice]['y' + activeYear]) p[activeDevice]['y' + activeYear] = {}
            if (!p[activeDevice]['y' + activeYear]['m' + activeMonth]) p[activeDevice]['y' + activeYear]['m' + activeMonth] = {}
            p[activeDevice]['y' + activeYear]['m' + activeMonth]['d' + day] = items
            console.log('d256 setChartApiDataCache:', p)
            return p
          })

          periodDaysItems = [...items, ...periodDaysItems]
        } catch (e) {
          console.log('d256 e:', e)
        } finally {
          setLoadDDB(false)
        }
      }

    }
  } else {
    console.log('d256 !!!Mock Data!!!')
  }
  return periodDaysItems
}

const getDeviceDataFromDDBStatus = async (deviceId, day, month, year, limit, lastKey ) => {
  const url = "https://hsqurmxg9f.execute-api.us-east-1.amazonaws.com/deviceStatus";
  const [timeFrom, timeTo] = dateRangeDay(day, month, year)
  const params = {
    deviceId,
    timeFrom: lastKey ? lastKey+1 : timeFrom,
    timeTo,
    ...(limit ? {limit} : {})
  }
  const apiResp = await axios.get(url, {params})
  return apiResp.data
}
