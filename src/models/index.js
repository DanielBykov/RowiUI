// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RowiDashboard, RowiDevice } = initSchema(schema);

export {
  RowiDashboard,
  RowiDevice
};