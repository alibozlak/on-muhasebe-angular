import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequestDto } from './dtos/login-request-dto';
import { Observable } from 'rxjs';
import { ResponseBodyWithObject } from '../../utils/response-bodies/response-body-with-object.model';
import { LoginResponseDto } from './dtos/login-response-dto';
import { baseApiUrl } from '../../utils/project-constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private hhtpClient : HttpClient = inject(HttpClient);
  private loginUrl = baseApiUrl + "/login"

  public login(loginRequestDto : LoginRequestDto) : Observable<ResponseBodyWithObject<LoginResponseDto>> {
    return this.hhtpClient.post<ResponseBodyWithObject<LoginResponseDto>>(this.loginUrl, loginRequestDto);
  }

}
