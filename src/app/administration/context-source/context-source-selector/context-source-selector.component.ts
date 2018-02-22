import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { delay } from 'q';
import { ContextSourceCategory } from '../../../models/contextSourceCategory';
import { PeptideService } from '../../../services/peptide.service';
import { SampleTypeService } from '../../../services/sample-type.service';
@Component({
  selector: 'app-context-source-selector',
  templateUrl: './context-source-selector.component.html',
  styleUrls: ['./context-source-selector.component.css']
})
export class ContextSourceSelectorComponent implements OnInit {

  constructor(private peptideService: PeptideService,
    private sampleTypeService: SampleTypeService) { }

  contextSourcesCategories = [];
  selectedContext: ContextSourceCategory;

  sampleTypes = [];

  ngOnInit() {
    this.peptideService.getContextSourceCategories()
      .forEach((contextSourceCategory => this.contextSourcesCategories.push(contextSourceCategory)));
    this.selectedContext = this.contextSourcesCategories[0];
    
    delay(1).then(() => {
      const elem = document.getElementById('select_context');
      let instance = M.FormSelect.init(elem, {});
      this.changeSelection();
    });
    this.sampleTypes = this.sampleTypeService.getSamplesTypes();
  }

  changeSelection(): void {
    this.peptideService.changeSelectedContextSourceCategory(this.selectedContext);
  }



}
