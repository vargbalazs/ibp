export class User {
  constructor(
    public id?: number,
    public userId?: string,
    public firstName?: string,
    public lastName?: string,
    public userName?: string,
    public userEmail?: string,
    public password?: string,
    public lastLoginDate?: Date,
    public joinDate?: Date,
    public active?: boolean,
    public notLocked?: boolean,
    public firstLogin?: boolean
  ) {}
}
