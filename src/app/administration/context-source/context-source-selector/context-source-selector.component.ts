import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { delay } from 'q';
import { ContextSourceCategory } from '../../../models/contextSourceCategory';
import { PeptideService } from '../../../services/peptide.service';
@Component({
  selector: 'app-context-source-selector',
  templateUrl: './context-source-selector.component.html',
  styleUrls: ['./context-source-selector.component.css']
})
export class ContextSourceSelectorComponent implements OnInit {

  constructor(private peptideService: PeptideService) { }

  contextSourcesCategories = [new ContextSourceCategory('peptide', 'Peptide'), new ContextSourceCategory('isample', 'Instrument sample')];
  //selectedContext: ContextSourceCategory = this.contextSourcesCategories[0];
  selectedContext: ContextSourceCategory = this.contextSourcesCategories[0];

  ngOnInit() {
    delay(1).then(() => {
      const elem = document.getElementById('select_context');
      let instance = M.FormSelect.init(elem, {});
    });
    this.peptideService.changeSelectedContextSourceCategory(this.selectedContext);
  }


  changeSelection(): void {
    this.peptideService.changeSelectedContextSourceCategory(this.selectedContext);
  }



}
