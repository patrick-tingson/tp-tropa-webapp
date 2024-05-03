import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GroupDataModel } from './join-group.model';

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {
  constructor(private http: HttpClient) { }

  get(groupId: string) {
    let params = new HttpParams();
    params = params.set("id", groupId);
    return this.http.get<GroupDataModel>(`${environment.serviceUrl}${environment.groupEndpoint}`, { params });
  }
  
  create() {
    return this.http.post<GroupDataModel>(`${environment.serviceUrl}${environment.groupEndpoint}`, null);
  }
}
