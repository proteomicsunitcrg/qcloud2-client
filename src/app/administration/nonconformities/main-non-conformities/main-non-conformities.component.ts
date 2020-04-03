import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-non-conformities',
  templateUrl: './main-non-conformities.component.html',
  styleUrls: ['./main-non-conformities.component.css']
})
export class MainNonConformitiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  public navigateToTroubleshootingCreator(): void {
    this.router.navigate(['/application/administration/troubleshooting/new']);
  }

}
