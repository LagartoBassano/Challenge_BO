interface LoginProps {
  id: string;
  userId: number;
  timestamp: Date;
  token?: string;
}

class Login {
  private id: string;
  private userId: number;
  private timestamp: Date;
  private token?: string;

  constructor({
    id,
    userId,
    timestamp,
    token
  }: LoginProps) {
    this.id = id;
    this.userId = userId;
    this.timestamp = timestamp;
    this.token = token;
  }

  // Getters
  getId(): string { return this.id; }
  getUserId(): number { return this.userId; }
  getTimestamp(): Date { return this.timestamp; }
  getToken(): string | undefined { return this.token; }

  toString(): string {
    return `Login [id=${this.id}, userId=${this.userId}, timestamp=${this.timestamp}]`;
  }
}

export default Login;
