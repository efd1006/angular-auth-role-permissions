import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "../models";
import { CrudService } from "./crud.service";
import { SessionService } from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role> {

  constructor(
    public http: HttpClient,
    public sessionService: SessionService
  ) {
    super('role', http, sessionService)
  }
}