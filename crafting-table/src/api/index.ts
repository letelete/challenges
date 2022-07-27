import type { Api, ApiConfig, Endpoints } from './types';
import { database, getDatabaseProvider } from '@/db';

import { endpoints } from './endpoints';

const databaseProvider = getDatabaseProvider(database);

const config: ApiConfig = {
  db: databaseProvider,
};

export const api = Object.entries(endpoints).reduce(
  (obj, [endpointName, getEndpoint]) => ({
    ...obj,
    [endpointName]: getEndpoint(config),
  }),
  {}
) as Api<Endpoints>;
