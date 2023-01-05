import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type RowiDashboardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RowiDeviceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class RowiDashboard {
  readonly id: string;
  readonly options?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<RowiDashboard, RowiDashboardMetaData>);
  static copyOf(source: RowiDashboard, mutator: (draft: MutableModel<RowiDashboard, RowiDashboardMetaData>) => MutableModel<RowiDashboard, RowiDashboardMetaData> | void): RowiDashboard;
}

export declare class RowiDevice {
  readonly id: string;
  readonly name?: string | null;
  readonly deviceId?: string | null;
  readonly deviceSecret?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<RowiDevice, RowiDeviceMetaData>);
  static copyOf(source: RowiDevice, mutator: (draft: MutableModel<RowiDevice, RowiDeviceMetaData>) => MutableModel<RowiDevice, RowiDeviceMetaData> | void): RowiDevice;
}