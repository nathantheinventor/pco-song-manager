import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PCO_URL = 'https://api.planningcenteronline.com/services/v2';
let pubHTTP;

function make_auth(username = null, password = null) {
  // Generate basic HTTP authentication.
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
  username = username || localStorage.username;
  password = password || localStorage.password;

  const token = btoa(`${username}:${password}`);
  return {
    Authorization: `Basic ${token}`
  };
}

function http_get(url: string): Promise<any> {
  return new Promise((res, rej) => {
    pubHTTP.get(`${PCO_URL}/${url}`, { headers: make_auth() }).subscribe(res, rej);
  });
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    pubHTTP = http;
  }

  check_login(username: string, password: string): Promise<boolean> {
    return new Promise(res => {
      this.http.get(`${PCO_URL}`, { headers: make_auth(username, password) })
        .subscribe(
          success => {
            res(true);
          },
          error => {
            res(false);
          }
        );
    });
  }

  async get_arrangement(songId: number, arrangementId: number) {
    const result = await http_get(`songs/${songId}/arrangements/${arrangementId}`);
    return result.data.attributes;
  }
}
