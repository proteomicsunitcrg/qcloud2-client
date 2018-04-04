import { Component, OnInit } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
declare var M: any;
/**
 * Main component of the context source form
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-main-context-source',
  templateUrl: './main-context-source.component.html',
  styleUrls: ['./main-context-source.component.css']
})
export class MainContextSourceComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService) { }

  ngOnInit() {    
    const elem = document.getElementById('tabs');
    let instance = M.Tabs.init(elem);
  }

}
