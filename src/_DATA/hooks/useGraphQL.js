import {API} from "aws-amplify";
import {useState} from "react";
import {
  createRowiUIDash, createRowiUIDevice,
  createRowiUIUser,
  updateRowiUIUser
} from "../../graphql/mutations";

// Custom Queries
const getRowiUIUserWithDevices = /* GraphQL */ `
    query GetRowiUIUser($id: ID!) {
        getRowiUIUser(id: $id) {
            id
            name
            RowiUIDash {
                id
                name
                logo
                emailOwner
                RowiUIDevices {
                    items {
                        id
                        name
                        deviceID
                        createdAt
                        updatedAt
                    }
                    nextToken
                }
                RowiUIDashViewers {
                    items {
                        id
                        email
                        rowiuidashID
                        status
                        createdAt
                        updatedAt
                    }
                }
                createdAt
                updatedAt
                owner
            }
            createdAt
            updatedAt
            rowiUIUserRowiUIDashId
            owner
        }
    }
`;

// Use: apiGraphQlQuery( { query }, variables )
export const apiGraphQlQuery = async (queryDict, variables, devLog=true) => {
  const qName = Object.keys(queryDict)[0];
  const qBody = queryDict[qName];
  try {
    const q = await API.graphql({
      query: qBody,
      variables
    })
    const {data: { [qName]: data_ }} = q
    if(devLog) console.log(`d256 GQL data (${qName}): `, {return_: data_, row: q, variables})
    return data_
  } catch (e) {
    if(devLog) {
      console.error('d256 apiGraphQlQuery:', {e, variables, qName})
      return e
    }
  }
}

export const apiGraphQlQuery_WithErrorReturn = async (queryDict, variables, devLog=true) => {
  try {
    const qName = Object.keys(queryDict)[0];
    const qBody = queryDict[qName];
    const q = await API.graphql({
      query: qBody,
      variables
    })
    const {data: { [qName]: data_ }} = q
    if(devLog) console.log(`d256 GQL data (${qName}): `, {return_: data_, row: q, variables})
    return  [data_, null]
  } catch (e) {
    if(devLog) {
      console.error('d256 apiGraphQlQuery_WithErrorReturn:', {e, variables})
      return [e.data, e.errors]
    }
  }
}

export const useUserUI = () => {
  const [userUI, setUserUI ] = useState()
  const [doing, setDoing ] = useState(false)

  const fetchOrCreateUserUI = async (sub, email) => {
    if(doing) return
    setDoing(true)
    const userUIData = await apiGraphQlQuery({getRowiUIUser:getRowiUIUserWithDevices}, {
      id: sub,
    })

    if(userUIData){
      setUserUI(userUIData)
    } else {
      setUserUI(
        await apiGraphQlQuery({createRowiUIUser}, {input: {id: sub, email}})
      )
    }
    setDoing(false)
  }

  const fetchUserUI = async (sub) => {
    setUserUI(
      await apiGraphQlQuery({getRowiUIUser:getRowiUIUserWithDevices}, {
        id: sub,
      })
    )
  }

  return { userUI, setUserUI, fetchOrCreateUserUI, fetchUserUI }
}

export const useDashCreate = () => {
  // createRowiUIDash
  // const [userUI, setUserUI ] = useState()
  const addDash = async (emailOwner, sub) => {
    const {id: idDash} = await apiGraphQlQuery({createRowiUIDash}, {
      input: {emailOwner}
    })
    console.log('d256 addDash4:', )

    // Add Dash to UserUI
    let q = await apiGraphQlQuery({updateRowiUIUser}, {
      input: {
        id: sub,
        rowiUIUserRowiUIDashId: idDash
      }
    })
    console.log('d256 updateRowiUIUser:', q)
  }
  return { addDash }
  // d8e9782c-db69-4262-86ea-e710d30b4060
  // createRowiUIUser a1sub
  // createRowiUIDash e15740e8-6b08-4f5c-bb3b-075ab8653459
}

export const deviceCreate = async (name, deviceID, rowiuidashID ) => {
  const {id} = await apiGraphQlQuery({createRowiUIDevice}, {
    input: {name, deviceID, rowiuidashID}
  })
  return id
}

export const useDeviceList = () => {
  const [deviceItems, setDeviceItems ] = useState([])


  const deviceListQuery = async () => {
    // const {data: {listRowiDevices: {items}}} = await apiGraphQlQuery({listRowiDevices})
    // setDeviceItems(items)
  }
  return {deviceListQuery, deviceItems, setDeviceItems}
}
