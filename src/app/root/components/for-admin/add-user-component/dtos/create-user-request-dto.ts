export interface CreateUserRequestDto {

    username : string;

    password : string;

    email : string;

    isActive : boolean;

    isAdmin : boolean;

    extraInformation : string | null;
}