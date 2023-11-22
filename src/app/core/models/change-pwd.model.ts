export class ChangePwdModel {
  constructor(
    public userId?: string,
    public oldPassword?: string,
    public password?: string,
    public confirmPassword?: string
  ) {}
}
