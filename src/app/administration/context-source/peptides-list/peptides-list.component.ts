import { Component, OnInit } from '@angular/core';
import { PeptideService } from '../../../services/peptide.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { Peptide } from '../../../models/peptide';
import { SampleComposition } from '../../../models/sampleComposition';

@Component({
  selector: 'app-peptides-list',
  templateUrl: './peptides-list.component.html',
  styleUrls: ['./peptides-list.component.css']
})
export class PeptidesListComponent implements OnInit {

  constructor(private peptideService: PeptideService,
    private sampleCompositionService: SampleCompositionService) { }

  peptides = [];

  ngOnInit() {
    this.loadPeptides();
  }

  private loadPeptides(): void {
    this.peptideService.getAllPeptides()
      .subscribe(
        peptides => peptides.forEach(peptide => {
          // get the belongs
          peptide['belongs'] = this.getSampleType(peptide);          
        }),
        error => console.log(error));
  }

  private getSampleType(peptide: Peptide): void {
    let belongs = '';
    this.sampleCompositionService.getSampleCompositionByPeptide(peptide)
    .subscribe(
      (sampleCompositions) => {
        sampleCompositions.forEach(sampleComposition => {
          // console.log(sampleComposition.sampleType.name);
          belongs = belongs + sampleComposition.sampleType.name +', ';
        });
        peptide['belongs']= belongs.slice(0,-2);
        this.peptides.push(peptide);
      },
      error => console.log(error));
    
  }

}
