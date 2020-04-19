export class UserPosition {
  id: number;
  positionName: string;
  id_parent: number;

  constructor();
  constructor(p: UserPosition);

  constructor(position?: UserPosition) {
    this.id = position?.id || -1;
    this.positionName = position?.positionName || '';
    this.id_parent = position?.id_parent || -1;
  }
}
