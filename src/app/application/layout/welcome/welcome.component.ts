import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }
  videoLinks = [
    { 
      title: "Getting started as a user",
      link: "https://drive.google.com/file/d/1nHgbWmRltToAEvBF9J4_kd7k2q0mx_Pi/preview"
    },
    { 
      title: "Getting started as a manager",
      link: "https://drive.google.com/file/d/10VhYb-q_Usrp-gCTVSpQf3u2fBZK7oEp/preview"
    },
    { 
      title: "Thresholds and guidesets",
      link: "https://drive.google.com/file/d/1WCmGel417NYIZiyfIFLsln98dSDNKwP4/preview"
    },
  ];
  ngOnInit() {
  }

}
