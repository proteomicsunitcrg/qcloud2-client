import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  instruments = ['Velosin','Luminoide'];

  constructor(private authService: AuthService) { }

  isAdmin = false;
  isManager = false;

  ngOnInit() {
    if(this.authService.checkIfAdmin()) {
      this.isAdmin = true;
    }
    if(this.authService.checkRole('ROLE_MANAGER')){
      this.isManager = true;
    }
  }

  open(dropdown) : void {    
    const elem = document.getElementById(dropdown);    
    const instance = M.Dropdown.init(elem, {constrainWidth: false});
    instance.open();
  }

}
