import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public constructor(private titleService: Title){}
  title = 'QCloud 2.0';
  
  ngOnInit() {
    this.setTitle();
  }
  /**
   * @name SetTitle
   * @description If the enviroment is not prod shows the env in the title
   * to avoid confusion in the browser
   * @author Marc Serret
   */
  setTitle() {
    if (!environment.production) {
      this.titleService.setTitle(environment.name + this.titleService.getTitle());
    }
  }

}
