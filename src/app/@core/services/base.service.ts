import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';

export class BaseService {
  base_url = environment.baseUrl;
  withToken: boolean = true;
  withCustomHeader: boolean = false;
  customHeaders: any = null;

  constructor(
    public http: HttpClient,
    public sessionService: SessionService,
  ) { }

  private getHeaders() {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json',
    );
    const token = this.sessionService.getAccessToken();
    if (token && this.withToken && !this.withCustomHeader) {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + token);
      return headers;
    }
    if (this.withCustomHeader) return this.customHeaders;
    return headers;
  }

  public $get(url: string, withToken: boolean = true, withCustomHeader: boolean = false, customHeaders: HttpHeaders = null) {
    this.withToken = withToken;
    this.withCustomHeader = withCustomHeader;
    if (this.withCustomHeader && customHeaders) {
      this.customHeaders = customHeaders;
    }
    return this.http.get(this.base_url + url, { headers: this.getHeaders() });
  }

  public $post(url: string, data: any, withToken: boolean = true, withCustomHeader: boolean = false, customHeaders: HttpHeaders = null) {
    this.withToken = withToken;
    this.withCustomHeader = withCustomHeader;
    if (this.withCustomHeader && customHeaders) {
      this.customHeaders = customHeaders;
    }
    return this.http.post(this.base_url + url, JSON.stringify(data), { headers: this.getHeaders() });
  }

  public $put(url: string, data: any, withToken: boolean = true, withCustomHeader: boolean = false, customHeaders: HttpHeaders = null) {
    this.withToken = withToken;
    this.withCustomHeader = withCustomHeader;
    if (this.withCustomHeader && customHeaders) {
      this.customHeaders = customHeaders;
    }
    return this.http.put(this.base_url + url, JSON.stringify(data), { headers: this.getHeaders() });
  }

  public $delete(url: string, withToken: boolean = true, withCustomHeader: boolean = false, customHeaders: HttpHeaders = null) {
    this.withToken = withToken;
    this.withCustomHeader = withCustomHeader;
    if (this.withCustomHeader && customHeaders) {
      this.customHeaders = customHeaders;
    }
    return this.http.delete(this.base_url + url, { headers: this.getHeaders() });
  }

  public formDataPost(url: string, formData: FormData, withToken: boolean = true) {
    this.withToken = withToken;
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.sessionService.getAccessToken());
    return this.http.post(this.base_url + url, formData, { headers: headers });
  }

  public formDataPut(url: string, formData: FormData, withToken: boolean = true) {
    this.withToken = withToken;
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.sessionService.getAccessToken());
    return this.http.put(this.base_url + url, formData, { headers: headers }).pipe(
      map(() => true),
    );
  }

}
