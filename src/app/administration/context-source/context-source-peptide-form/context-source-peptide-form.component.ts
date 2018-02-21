import { Component, OnInit } from '@angular/core';
import { Peptide } from '../../../models/peptide';
import { PeptideService } from '../../../services/peptide.service';
import { InstrumentSample } from '../../../models/instrumentSample';
import { ContextSourceCategory } from '../../../models/contextSourceCategory';
import { delay } from 'q';
import { ContextSource } from '../../../models/contextSource';

@Component({
  selector: 'app-context-source-peptide-form',
  templateUrl: './context-source-peptide-form.component.html',
  styleUrls: ['./context-source-peptide-form.component.css']
})
export class ContextSourcePeptideFormComponent implements OnInit {

  constructor(private peptideService: PeptideService) { }

  peptide: Peptide = new Peptide(null,'','','');

  instrumentSample: InstrumentSample= new InstrumentSample(null,'','');

  contextSource: ContextSource = new ContextSource(null,'');

  // currentContextSourceCategory: ContextSourceCategory = new ContextSourceCategory('','');
  // currentContextSourceCategory: ContextSourceCategory;
  currentContextSourceCategory: ContextSourceCategory = null;


  ngOnInit() {
    this.peptideService.selectedContextSource$.subscribe(
      (action) => {                
        this.currentContextSourceCategory = action;
      },
      (error) => {
        console.log(error);
      });
  }
  onSubmit(): void {
    this.peptideService.addPeptide(this.peptide).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
