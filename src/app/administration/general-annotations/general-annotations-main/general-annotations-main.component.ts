import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-annotations-main',
  templateUrl: './general-annotations-main.component.html',
  styleUrls: ['./general-annotations-main.component.css']
})
export class GeneralAnnotationsMainComponent implements OnInit {

  constructor() { }

  newAnnotation = false;
  id: String;

  ngOnInit() {
  }

  open(id: String): void {
    this.newAnnotation = true;
    this.id = id;
  }

  public close(): void {
    this.newAnnotation = false;
  }

}
