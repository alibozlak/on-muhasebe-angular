import { inject, Injectable } from '@angular/core';
import { baseApiUrl } from '../../../utils/project-constants';
import { HttpClient } from '@angular/common/http';
import { CreateUserRequestDto } from './dtos/create-user-request-dto';
import { Observable } from 'rxjs';
import { ResponseBody } from '../../../utils/response-bodies/response-body.model';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {

  private userUrl : string = baseApiUrl + "/v1/users"
  private httpClient : HttpClient = inject(HttpClient);

  public addUser(createUserRequestDto : CreateUserRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(this.userUrl + "/add-user", createUserRequestDto);
  }
}
