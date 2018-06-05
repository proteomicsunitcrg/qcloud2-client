import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { Peptide } from '../../../models/peptide';
import { PeptideService } from '../../../services/peptide.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { IsotopologueService } from '../../../services/isotopologue.service';

@Component({
  selector: 'app-isotopologue-peptide-list',
  templateUrl: './isotopologue-peptide-list.component.html',
  styleUrls: ['./isotopologue-peptide-list.component.css']
})
export class IsotopologuePeptideListComponent implements OnInit, OnChanges {

  constructor(private sampleCompositionService: SampleCompositionService,
    private isotopologueService: IsotopologueService) { }

  @Input() isoSampleType: SampleType;

  isSampleTypeSelected = false;

  peptides: Peptide[] = [];

  isNewPeptide = false;

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.isoSampleType !== undefined) {
      this.isSampleTypeSelected = true;
      this.loadPeptides();
    }

  }

  private loadPeptides(): void {
    this.sampleCompositionService.getAllPeptidesBySampleType(this.isoSampleType)
      .subscribe(
        (peptides) => {
          this.peptides = peptides;
        }
      );
  }

  addNewPeptide(): void {
    this.isNewPeptide = true;
  }

  sendPeptideToList(peptide: Peptide): void {
    this.isNewPeptide = false;
    if (peptide !== null) {
      this.peptides.push(peptide);
    }
  }

  doSelectPeptide(peptide: Peptide): void {
    // send the peptide to its sibling component
    this.isotopologueService.sendPeptideToIsotopologueBuilder(peptide);

  }
}
