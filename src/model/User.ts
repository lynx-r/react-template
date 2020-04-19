import { Role } from './Role';
import _ from 'lodash';

export class User {
  id: number;
  email: string;
  lastName: string;
  middleName: string;
  name: string;
  password: string;
  phone: string;
  idPosition: number;
  roles: Role[];
  isActive: boolean;

  constructor();

  constructor(user: User);

  constructor(user?: User) {
    this.id = user?.id || -1;
    this.email = user?.email || '';
    this.lastName = user?.lastName || '';
    this.middleName = user?.middleName || '';
    this.name = user?.name || '';
    this.password = user?.password || '';
    this.phone = user?.phone || '';
    this.idPosition = user?.idPosition || -1;
    this.roles = user?.roles || [];
    this.isActive = user?.isActive || false;
  }

  get isActiveText() {
    return this.isActive ? 'Активен' : 'Неактивен';
  }

  update({email, lastName, middleName, name, password, phone, idPosition, isActive}: any) {
    const clone: any = new User(this);
    const setIfValid = (value: any, field: string) => {
      const isValidValue = !_.isEmpty(value) || _.isNumber(value);
      if (isValidValue) {
        clone[field] = value;
      }
    };
    setIfValid(email, 'email');
    setIfValid(lastName, 'lastName');
    setIfValid(middleName, 'middleName');
    setIfValid(name, 'name');
    setIfValid(password, 'password');
    setIfValid(phone, 'phone');
    setIfValid(idPosition, 'idPosition');
    setIfValid(isActive, 'isActive');
    return clone;
  }

  toggleRole(role: Role) {
    const clone = new User(this);
    if (clone.hasRole(role)) {
      return clone.removeRole(role);
    } else {
      return clone.addRole(role);
    }
  }

  addRole(role: Role) {
    const clone = new User(this);
    if (_.isEmpty(clone.roles)) {
      clone.roles = [];
    }
    clone.roles.push(role);
    return clone;
  }

  removeRole(role: Role) {
    const clone = new User(this);
    if (_.isEmpty(clone.roles)) {
      return clone;
    }
    const index = clone.roles?.indexOf(role);
    clone.roles.splice(index, 1);
    return clone;
  }

  hasRole(role: Role) {
    return this.roles?.includes(role) || false;
  }

  hasMobileRole() {
    return this.roles?.includes('mobile') || false;
  }

  hasReportRole() {
    return this.roles?.includes('report') || false;
  }
}
