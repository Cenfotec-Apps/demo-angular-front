import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected source!: string;
  protected http = inject(HttpClient);

  public find(id: string | number): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.source + '/' + id);
  }

  public findAll(): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source);
  }

  public findAllWithParams(params: any = {}): Observable<IResponse<T[]>> {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    })
    return this.http.get<IResponse<T[]>>(this.source, {params: queryParams});
  }

  public add(data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.source, data);
  }

  public edit(id: number | undefined, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.source + '/' + id, data);
  }

  public del(id: any): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(this.source + '/' + id);
  }
}
