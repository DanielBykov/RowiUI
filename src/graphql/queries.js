/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRowiUIDash = /* GraphQL */ `
  query GetRowiUIDash($id: ID!) {
    getRowiUIDash(id: $id) {
      id
      name
      logo
      emailOwner
      RowiUIDevices {
        items {
          id
          name
          deviceID
          rowiuidashID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      RowiUIDashViewers {
        items {
          id
          name
          email
          status
          role
          rowiuidashID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listRowiUIDashes = /* GraphQL */ `
  query ListRowiUIDashes(
    $filter: ModelRowiUIDashFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRowiUIDashes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        logo
        emailOwner
        RowiUIDevices {
          nextToken
        }
        RowiUIDashViewers {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRowiUIDevice = /* GraphQL */ `
  query GetRowiUIDevice($id: ID!) {
    getRowiUIDevice(id: $id) {
      id
      name
      deviceID
      rowiuidashID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listRowiUIDevices = /* GraphQL */ `
  query ListRowiUIDevices(
    $filter: ModelRowiUIDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRowiUIDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        deviceID
        rowiuidashID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRowiUIDashViewer = /* GraphQL */ `
  query GetRowiUIDashViewer($id: ID!) {
    getRowiUIDashViewer(id: $id) {
      id
      name
      email
      status
      role
      rowiuidashID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listRowiUIDashViewers = /* GraphQL */ `
  query ListRowiUIDashViewers(
    $filter: ModelRowiUIDashViewerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRowiUIDashViewers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        status
        role
        rowiuidashID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRowiUIUser = /* GraphQL */ `
  query GetRowiUIUser($id: ID!) {
    getRowiUIUser(id: $id) {
      id
      name
      email
      RowiUIDash {
        id
        name
        logo
        emailOwner
        RowiUIDevices {
          nextToken
        }
        RowiUIDashViewers {
          nextToken
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
export const listRowiUIUsers = /* GraphQL */ `
  query ListRowiUIUsers(
    $filter: ModelRowiUIUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRowiUIUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        RowiUIDash {
          id
          name
          logo
          emailOwner
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        rowiUIUserRowiUIDashId
        owner
      }
      nextToken
    }
  }
`;
export const viewerByEmail = /* GraphQL */ `
  query ViewerByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRowiUIDashViewerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    viewerByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        status
        role
        rowiuidashID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
