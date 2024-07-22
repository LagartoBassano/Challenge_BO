class LoginDTO {
  public id: string;
  public userId: number;
  public timestamp: Date;
  public token?: string;

  constructor({
    id,
    userId,
    timestamp,
    token,
  }: {
    id: string;
    userId: number;
    timestamp: Date;
    token?: string;
  }) {
    this.id = id;
    this.userId = userId;
    this.timestamp = timestamp;
    this.token = token;
  }
}

export default LoginDTO;