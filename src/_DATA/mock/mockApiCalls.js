import {ddbMock} from "./mockApiData";

export const deviceDataFromDDBStatus_Mock = async (deviceId) => {
  const p = new Promise((res, rej) => {
    setTimeout(() => {
        res(ddbMock[deviceId] ?? ddbMock.default)
    }, 1000)
  })
  return p
}

