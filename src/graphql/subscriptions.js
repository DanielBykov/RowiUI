/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRowiUIDash = /* GraphQL */ `
  subscription OnCreateRowiUIDash(
    $filter: ModelSubscriptionRowiUIDashFilterInput
    $owner: String
  ) {
    onCreateRowiUIDash(filter: $filter, owner: $owner) {
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
export const onUpdateRowiUIDash = /* GraphQL */ `
  subscription OnUpdateRowiUIDash(
    $filter: ModelSubscriptionRowiUIDashFilterInput
    $owner: String
  ) {
    onUpdateRowiUIDash(filter: $filter, owner: $owner) {
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
export const onDeleteRowiUIDash = /* GraphQL */ `
  subscription OnDeleteRowiUIDash(
    $filter: ModelSubscriptionRowiUIDashFilterInput
    $owner: String
  ) {
    onDeleteRowiUIDash(filter: $filter, owner: $owner) {
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
export const onCreateRowiUIDevice = /* GraphQL */ `
  subscription OnCreateRowiUIDevice(
    $filter: ModelSubscriptionRowiUIDeviceFilterInput
    $owner: String
  ) {
    onCreateRowiUIDevice(filter: $filter, owner: $owner) {
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
export const onUpdateRowiUIDevice = /* GraphQL */ `
  subscription OnUpdateRowiUIDevice(
    $filter: ModelSubscriptionRowiUIDeviceFilterInput
    $owner: String
  ) {
    onUpdateRowiUIDevice(filter: $filter, owner: $owner) {
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
export const onDeleteRowiUIDevice = /* GraphQL */ `
  subscription OnDeleteRowiUIDevice(
    $filter: ModelSubscriptionRowiUIDeviceFilterInput
    $owner: String
  ) {
    onDeleteRowiUIDevice(filter: $filter, owner: $owner) {
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
export const onCreateRowiUIDashViewer = /* GraphQL */ `
  subscription OnCreateRowiUIDashViewer(
    $filter: ModelSubscriptionRowiUIDashViewerFilterInput
    $owner: String
  ) {
    onCreateRowiUIDashViewer(filter: $filter, owner: $owner) {
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
export const onUpdateRowiUIDashViewer = /* GraphQL */ `
  subscription OnUpdateRowiUIDashViewer(
    $filter: ModelSubscriptionRowiUIDashViewerFilterInput
    $owner: String
  ) {
    onUpdateRowiUIDashViewer(filter: $filter, owner: $owner) {
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
export const onDeleteRowiUIDashViewer = /* GraphQL */ `
  subscription OnDeleteRowiUIDashViewer(
    $filter: ModelSubscriptionRowiUIDashViewerFilterInput
    $owner: String
  ) {
    onDeleteRowiUIDashViewer(filter: $filter, owner: $owner) {
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
export const onCreateRowiUIUser = /* GraphQL */ `
  subscription OnCreateRowiUIUser(
    $filter: ModelSubscriptionRowiUIUserFilterInput
    $owner: String
  ) {
    onCreateRowiUIUser(filter: $filter, owner: $owner) {
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
export const onUpdateRowiUIUser = /* GraphQL */ `
  subscription OnUpdateRowiUIUser(
    $filter: ModelSubscriptionRowiUIUserFilterInput
    $owner: String
  ) {
    onUpdateRowiUIUser(filter: $filter, owner: $owner) {
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
export const onDeleteRowiUIUser = /* GraphQL */ `
  subscription OnDeleteRowiUIUser(
    $filter: ModelSubscriptionRowiUIUserFilterInput
    $owner: String
  ) {
    onDeleteRowiUIUser(filter: $filter, owner: $owner) {
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
