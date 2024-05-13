export class UserModel {
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  role?: string;
  isActive: boolean = true;
  createdAt?: string;
  updatedAt?: string;
  isUsingInitialPassword?: boolean;
  accessToken?: string;

  constructor(json?: any) {
      if (json) {
          this.id = json.id;
          this.email = json.email;
          this.name = json.name;
          this.username = json.username;
          this.role = json.role;
          this.isActive = json.isActive??true;
          this.createdAt = json.createdAt;
          this.updatedAt = json.updatedAt;
          this.isUsingInitialPassword = json.isUsingInitialPassword;
          this.accessToken = json.accessToken;
      }
  }

  fromJson(json: any): UserModel {
      this.setData(json);
      return this;
  }

  toJson(): any {
      return {
          id: this.id,
          email: this.email,
          name: this.name,
          username: this.username,
          role: this.role,
          isActive: this.isActive,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          isUsingInitialPassword: this.isUsingInitialPassword,
          accessToken: this.accessToken,
      };
  }

  setAccessToken(token: string) {
      this.accessToken = token;
  }

  setData(data: UserModel) {
      if (!data) return;
      this.id = data.id;
      this.email = data.email;
      this.name = data.name;
      this.username = data.username;
      this.role = data.role;
      this.isActive = data.isActive;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.isUsingInitialPassword = data.isUsingInitialPassword;
      this.accessToken = data.accessToken;
  }

  resetData() {
      this.id = '';
      this.email = '';
      this.name = '';
      this.username = '';
      this.role = '';
      this.isActive = false;
      this.createdAt = '';
      this.updatedAt = '';
      this.isUsingInitialPassword = false;
      this.accessToken = '';
  }
}
