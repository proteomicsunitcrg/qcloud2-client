import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Peptide } from '../../../models/peptide';
import { SampleType } from '../../../models/sampleType';
import { PeptideService } from '../../../services/peptide.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { SampleComposition } from '../../../models/sampleComposition';

@Component({
  selector: 'app-new-peptide-form',
  templateUrl: './new-peptide-form.component.html',
  styleUrls: ['./new-peptide-form.component.css']
})
/**
 * This class holds the new peptide form creation.
 * @author Daniel Mancera
 */
export class NewPeptideFormComponent implements OnInit {

  constructor(private peptideService: PeptideService,
    private sampleCompositionService: SampleCompositionService) { }

  @Input() isoSampleType: SampleType;
  @Output() newPeptide = new EventEmitter<Peptide>();

  peptide: Peptide = new Peptide(null, null, null, null, null, null, null);

  ngOnInit() {
  }

  onSubmit(): void {
    this.peptide.abbreviated = this.peptide.sequence.substr(0, 3);
    this.peptideService.savePeptide(this.peptide)
      .subscribe(
        (p) => {
          // generate the sample composition
          const sampleComposition = new SampleComposition(p, this.isoSampleType, null);
          this.sampleCompositionService.saveSampleComposition(sampleComposition)
            .subscribe(
              (res) => {
                // send back the new peptide
                this.newPeptide.emit(p);
              }
            );
        }, err => console.log(err)
      );
  }

  doCancel(): void {
    this.newPeptide.emit(null);
  }

}
