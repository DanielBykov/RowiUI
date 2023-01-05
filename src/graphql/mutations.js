/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRowiUIDash = /* GraphQL */ `
  mutation CreateRowiUIDash(
    $input: CreateRowiUIDashInput!
    $condition: ModelRowiUIDashConditionInput
  ) {
    createRowiUIDash(input: $input, condition: $condition) {
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
export const updateRowiUIDash = /* GraphQL */ `
  mutation UpdateRowiUIDash(
    $input: UpdateRowiUIDashInput!
    $condition: ModelRowiUIDashConditionInput
  ) {
    updateRowiUIDash(input: $input, condition: $condition) {
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
export const deleteRowiUIDash = /* GraphQL */ `
  mutation DeleteRowiUIDash(
    $input: DeleteRowiUIDashInput!
    $condition: ModelRowiUIDashConditionInput
  ) {
    deleteRowiUIDash(input: $input, condition: $condition) {
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
export const createRowiUIDevice = /* GraphQL */ `
  mutation CreateRowiUIDevice(
    $input: CreateRowiUIDeviceInput!
    $condition: ModelRowiUIDeviceConditionInput
  ) {
    createRowiUIDevice(input: $input, condition: $condition) {
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
export const updateRowiUIDevice = /* GraphQL */ `
  mutation UpdateRowiUIDevice(
    $input: UpdateRowiUIDeviceInput!
    $condition: ModelRowiUIDeviceConditionInput
  ) {
    updateRowiUIDevice(input: $input, condition: $condition) {
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
export const deleteRowiUIDevice = /* GraphQL */ `
  mutation DeleteRowiUIDevice(
    $input: DeleteRowiUIDeviceInput!
    $condition: ModelRowiUIDeviceConditionInput
  ) {
    deleteRowiUIDevice(input: $input, condition: $condition) {
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
export const createRowiUIDashViewer = /* GraphQL */ `
  mutation CreateRowiUIDashViewer(
    $input: CreateRowiUIDashViewerInput!
    $condition: ModelRowiUIDashViewerConditionInput
  ) {
    createRowiUIDashViewer(input: $input, condition: $condition) {
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
export const updateRowiUIDashViewer = /* GraphQL */ `
  mutation UpdateRowiUIDashViewer(
    $input: UpdateRowiUIDashViewerInput!
    $condition: ModelRowiUIDashViewerConditionInput
  ) {
    updateRowiUIDashViewer(input: $input, condition: $condition) {
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
export const deleteRowiUIDashViewer = /* GraphQL */ `
  mutation DeleteRowiUIDashViewer(
    $input: DeleteRowiUIDashViewerInput!
    $condition: ModelRowiUIDashViewerConditionInput
  ) {
    deleteRowiUIDashViewer(input: $input, condition: $condition) {
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
export const createRowiUIUser = /* GraphQL */ `
  mutation CreateRowiUIUser(
    $input: CreateRowiUIUserInput!
    $condition: ModelRowiUIUserConditionInput
  ) {
    createRowiUIUser(input: $input, condition: $condition) {
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
export const updateRowiUIUser = /* GraphQL */ `
  mutation UpdateRowiUIUser(
    $input: UpdateRowiUIUserInput!
    $condition: ModelRowiUIUserConditionInput
  ) {
    updateRowiUIUser(input: $input, condition: $condition) {
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
export const deleteRowiUIUser = /* GraphQL */ `
  mutation DeleteRowiUIUser(
    $input: DeleteRowiUIUserInput!
    $condition: ModelRowiUIUserConditionInput
  ) {
    deleteRowiUIUser(input: $input, condition: $condition) {
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
