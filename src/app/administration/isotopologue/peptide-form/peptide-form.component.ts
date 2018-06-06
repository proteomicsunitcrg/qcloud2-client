import { Component, OnInit } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { Peptide } from '../../../models/peptide';

@Component({
  selector: 'app-peptide-form',
  templateUrl: './peptide-form.component.html',
  styleUrls: ['./peptide-form.component.css']
})
/**
 * This class holds the sample type selector and the
 * peptide management
 * @author Daniel Mancera
 */
export class PeptideFormComponent implements OnInit {

  constructor() { }

  selectedIsoSampleType: SampleType;

  ngOnInit() {
  }

  /**
   * It takes the iso sample type from the output of the
   * isotopologue category selector component
   * @param isoSampleType recieves a sample type from the component
   */
  selectSampleType(isoSampleType: SampleType): void {
    this.selectedIsoSampleType = isoSampleType;
  }
}
