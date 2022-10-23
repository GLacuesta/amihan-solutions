export interface ICredentials {
  username: string;
  password: string;
}

export interface IAuthConfig extends ICredentials{
  client_id: string;
  grant_type: string;
}
