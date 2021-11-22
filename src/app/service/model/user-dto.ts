
import { Token } from './token-dto';
export class User {
       public userId: number;
       public userName: string;
       public passwordNew?: string;
       public roles?: string;
       public createBy?: string;
       public updateBy?: string;
       public createDate?: string;
       public updateDate?: string;
       public status?: number;
       public token?: Token = new Token();
       public confirmPassword?: string;
       public roleID?: number;
}

export class UserDTO {
       public userID: number;
       public userName: string;
}

export class UserLogin {
       public id: number;
       public username: string;
       public email: string;
       public age: string;
       public gender: string;
       public isVip: string;
       public registerDate: Date;
       public expireDate: Date;
}
