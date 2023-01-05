import {createContext, useContext} from "react";

export const AuthContext = createContext(null)

export const ContextDataUI = createContext({})

let userUI__sample = {
  "id": "1ecc7832-a64f-4571-8761-f1060fb9bbdf",
  "name": null,
  "RowiUIDash": {
  "id": "dc3009f2-56bc-4b7b-a6f3-6fb381d2ead5",
    "name": null,
    "logo": null,
    "emailOwner": "a1@dd.dd",
    "RowiUIDevices": {
    "items": [
      {
        "id": "3455d7b6-9333-4784-a95e-cc0954000837",
        "name": "EC:94:CB:79:C8:D4",
        "deviceID": "EC:94:CB:79:C8:D4",
        "createdAt": "2022-10-29T21:45:29.663Z",
        "updatedAt": "2022-10-29T21:45:29.663Z",
        "owner": "1ecc7832-a64f-4571-8761-f1060fb9bbdf"
      }
    ],
      "nextToken": null
  },
  "RowiUIDashViewers": {
    "nextToken": null
  },
  "createdAt": "2022-10-29T20:37:45.099Z",
    "updatedAt": "2022-10-29T20:37:45.099Z",
    "owner": "1ecc7832-a64f-4571-8761-f1060fb9bbdf"
},
  "createdAt": "2022-10-29T20:32:24.555Z",
  "updatedAt": "2022-10-29T20:37:45.252Z",
  "rowiUIUserRowiUIDashId": "dc3009f2-56bc-4b7b-a6f3-6fb381d2ead5",
  "owner": "1ecc7832-a64f-4571-8761-f1060fb9bbdf"
}



export const useContextDataUi = () => {
  const c = useContext(ContextDataUI)
  return {
    loading: c.loadingUserUI,
    dashID: c?.userUI?.RowiUIDash?.id,
    deviceItems: c?.userUI?.RowiUIDash?.RowiUIDevices?.items,
    viewerItems: c?.userUI?.RowiUIDash?.RowiUIDashViewers?.items,

    isAdmin: c.isAdmin,
    isEditor: false,
    isViewer: false,
    isVisitor: !!c?.userUI?.RowiUIDash?.id,

    updateUserUI: c.updateUserUI,

    ...c
  }
}
