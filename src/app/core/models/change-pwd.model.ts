export class ChangePwdModel {
  constructor(
    public userId?: string,
    public oldPassword?: string,
    public newPassword?: string,
    public confirmPassword?: string
  ) {}
}
