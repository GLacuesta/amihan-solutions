import { cloneDeep, get, set } from 'lodash';
import { ICredentials } from '../interface';

export const buildAuthConfig = (payload: ICredentials) => {
  const url = get(process.env, 'REACT_APP_TOKEN_ENDPOINT', '');
  const grantType = get(process.env, 'REACT_APP_GRANT_TYPE', '');
  const clientId = get(process.env, 'REACT_APP_CLIENT_ID', '');

  if (!clientId
    || !grantType
    || !url
    || !get(payload, 'username', '')
    || !get(payload, 'password', '')
  ) { return undefined; }

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('username', get(payload, 'username', ''));
  params.append('password', get(payload, 'password', ''));
  params.append('grant_type', grantType);

  return {
    data: params,
    endpoint: url,
  };
}

// mimic how we set tokens in browser for persistent login
export const setLocalConfig = (data: any) => {
  if (get(data, 'access_token', '')) {
    localStorage.setItem('accessToken', get(data, 'access_token', ''));
    localStorage.setItem('refreshToken', get(data, 'refresh_token', ''));
  }
}

export const cleanLocalConfig = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const buildArray = (limit: number) => {
  const table = [];
  for (let x = 1; x < limit + 1; x++) {
    table.push({ rowId: x, cols: [] });
    for (let y = 1; y < limit + 1; y++) {
      const column = get(table, `[${x-1}].cols`, []);
      column.push({ colId: y * x, color: 'bg-white' });
      set(table, `[${x-1}].cols`, column);
    }
  }
  return table;
}

export const rebuildTable = (mouseDownIndex: string, mouseUpIndex: string, table: any, color: string) => {
  const delimitedMouseDownIndex = mouseDownIndex.split('-');
  const delimitedMouseUpIndex = mouseUpIndex.split('-');
  const startRowIndicator = +delimitedMouseDownIndex[0] <= +delimitedMouseUpIndex[0] ? +delimitedMouseDownIndex[0] : +delimitedMouseUpIndex[0];
  const endRowIndicator = +delimitedMouseDownIndex[0] <= +delimitedMouseUpIndex[0] ? +delimitedMouseUpIndex[0] : +delimitedMouseDownIndex[0];
  const startColIndicator = +delimitedMouseDownIndex[1] <= +delimitedMouseUpIndex[1] ? +delimitedMouseDownIndex[1] : +delimitedMouseUpIndex[1];
  const endColIndicator = +delimitedMouseDownIndex[1] <= +delimitedMouseUpIndex[1] ? +delimitedMouseUpIndex[1] : +delimitedMouseDownIndex[1];

  const updatedTable = cloneDeep(table);
  for (let x = startRowIndicator; x <= endRowIndicator; x++) {
    for (let y = startColIndicator; y <= endColIndicator; y++) {
      set(updatedTable, `[${x}].cols[${y}].color`, color);
    }
  }
  return updatedTable;
}
