import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../@core/services/role.service';
import { ServerDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  source: ServerDataSource;
  
  settings = {
    pager: {
      perPage: 20,
    },
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    mode: 'external',
    columns: {
      name: {
        title: 'Role Name',
        type: 'string',
        sort: false
      }
    },
  };

  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.source = this.roleService.toSmartTableDataSource();
  }

}
