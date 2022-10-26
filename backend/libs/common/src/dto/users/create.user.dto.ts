export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  secondary_email?: string;
  password: string;

  refresh_token?: string;
  verify_key?: string;
  verified: boolean;
}