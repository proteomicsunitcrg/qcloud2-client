import { Component, OnInit } from '@angular/core';
import { Peptide } from '../../../models/peptide';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';

@Component({
  selector: 'app-sample-peptides-list',
  templateUrl: './sample-peptides-list.component.html',
  styleUrls: ['./sample-peptides-list.component.css']
})
export class SamplePeptidesListComponent implements OnInit {

  constructor(private sampleCompositionService: SampleCompositionService) { }

  peptides: Peptide[]=[];

  ngOnInit() {
    this.sampleCompositionService.currentSampleType$.subscribe(
      (sampleType) => {
        this.changeListBySampleType(sampleType);
      });
  }

  private changeListBySampleType(sampleType: SampleType): void {
    this.sampleCompositionService.getAllPeptidesBySampleType(sampleType).subscribe(
      (peptides) => this.loadPeptidesList(peptides)
    )
  }

  private loadPeptidesList(peptides: Peptide[]): void {
    this.peptides = [];
    peptides.forEach(peptide=> this.peptides.push(peptide));
  }



}
