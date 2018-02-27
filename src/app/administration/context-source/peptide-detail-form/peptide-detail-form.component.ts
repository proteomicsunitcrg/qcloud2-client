import { Component, OnInit } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { Peptide } from '../../../models/peptide';
import { SampleComposition } from '../../../models/sampleComposition';
import { SampleType } from '../../../models/sampleType';

@Component({
  selector: 'app-peptide-detail-form',
  templateUrl: './peptide-detail-form.component.html',
  styleUrls: ['./peptide-detail-form.component.css']
})
export class PeptideDetailFormComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService) { }

  sampleTypes: SampleType[] = [];

  
  formData = {
    currentPeptide: new Peptide(null, '', '', ''),
    compositions : []
    }


  // compositions = [];

  compositionInputs = {};

  ngOnInit() {
    this.loadSampleTypes();
  }

  show():void {
    console.log(this.compositionInputs);    
    Object.keys(this.compositionInputs).forEach(
      (composition) => {
        if(this.compositionInputs[composition]) {
          let sampleComposition = new SampleComposition(this.formData.currentPeptide, this.formData.compositions[composition].sampleType,this.formData.compositions[composition].concentration);
          
          console.log(sampleComposition);
        }
      }
    )
  }

  onSubmit(): void {
    console.log(this.formData);
    
  }

  private loadSampleTypes(): void {
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        sampleTypes => {
          sampleTypes.forEach(sampleType => {
            this.sampleTypes.push(sampleType);
            this.formData.compositions[sampleType.id] = new SampleComposition(null,sampleType,null);
            this.compositionInputs[sampleType.id] = false;
          });
        },
        error => console.log(error)
      );
  }

}

