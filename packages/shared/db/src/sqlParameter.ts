import { SqlParameter as CosmosSqlParameter } from '@azure/cosmos';

export interface SqlParameter extends CosmosSqlParameter {
  name: string,
  value: any,
}

export default SqlParameter;