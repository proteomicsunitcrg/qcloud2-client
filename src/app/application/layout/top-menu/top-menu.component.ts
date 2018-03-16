import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { AuthService } from '../../../auth.service';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSource } from '../../../models/dataSource';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  //instruments = ['Velosin','Luminoide'];

  dataSources: DataSource[] = [];

  constructor(private authService: AuthService,
    private dataSourceService: DataSourceService) { }

  isAdmin = false;
  isManager = false;

  ngOnInit() {
    if(this.authService.checkIfAdmin()) {
      this.isAdmin = true;
    }
    if(this.authService.checkRole('ROLE_MANAGER')){
      this.isManager = true;
    }
    this.loadNodeInstruments();
  }

  private loadNodeInstruments(): void {
    this.dataSourceService.getAllNodeDataSources()
      .subscribe(
        (dataSources)=> {
          this.dataSources = dataSources;
        }
      )
  }

  viewInstrument(instrument: DataSource): void {
    this.dataSourceService.selectDataSourceForDisplay(instrument);
  }


  open(dropdown) : void {    
    const elem = document.getElementById(dropdown);    
    const instance = M.Dropdown.init(elem, {constrainWidth: false});
    instance.open();
  }

}
