import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Peptide } from '../models/peptide';
import { Observable } from 'rxjs/Observable';
import { Isotopologue } from '../models/isotopologue';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IsotopologueService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private isotopologueUrl = this.apiPrefix + 'api/contextsource/isotopologue';

  private selectedPeptide = new Subject<Peptide>();
  selectedPeptide$ = this.selectedPeptide.asObservable();

  public sendPeptideToIsotopologueBuilder(peptide: Peptide): void {
    this.selectedPeptide.next(peptide);
  }

  public getIsotopologuesByMainPeptide(mainPeptide: Peptide): Observable<Isotopologue[]> {
    return this.httpClient.get<Isotopologue[]>(this.isotopologueUrl + '/main/' + mainPeptide.id);
  }


}
