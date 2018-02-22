import { Component, OnInit } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';

@Component({
  selector: 'app-main-context-source',
  templateUrl: './main-context-source.component.html',
  styleUrls: ['./main-context-source.component.css']
})
export class MainContextSourceComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService) { }


  ngOnInit() {
    this.sampleTypeService.loadSamplesTypes();
  }

}
