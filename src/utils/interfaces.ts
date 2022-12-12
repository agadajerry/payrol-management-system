export interface IAction {
  type: string;
  payload?: any;
}

export interface IRegisteration {
  password: string;
  website: string;
  name: string;
  address: string;
  phone_no: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}
