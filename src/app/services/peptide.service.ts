import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Peptide } from '../models/peptide';
import { SampleTypeComplexity } from '../models/sampleTypeComplexity';
import { map } from 'rxjs/operators';
import { TraceColor } from '../models/TraceColor';

@Injectable()
export class PeptideService {
  private apiPrefix = environment.apiPrefix;
  private peptideUrl = this.apiPrefix + 'api/contextsource/peptide';

  private peptideSelector = new Subject<Peptide>();

  selectedPeptide$ = this.peptideSelector.asObservable();

  /**
   * This observable is used for communicate the list
   * with the form.
   */
  private peptidePersist = new Subject<Peptide>();
  peptideFromDb$ = this.peptidePersist.asObservable();

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all peptides from the database
   */
  public getAllPeptides(): Observable<Peptide[]> {
    return this.httpClient.get<Peptide[]>(this.peptideUrl).pipe(map(res => {
      const peptides: Peptide[] = [];
      res.forEach(
        (peptide) => {
          let tc = null;
          if (peptide.traceColor) {
            tc = new TraceColor(peptide.traceColor.mainColor, peptide.traceColor.apiKey);
          } else {
            tc = new TraceColor(null, null);
          }
          const p = new Peptide(peptide.id, peptide.name,
            peptide.sequence, peptide.abbreviated,
            peptide.mz, peptide.charge, peptide.apiKey,
            tc, peptide.shadeGrade);
          peptides.push(p);
        }
      );
      return peptides;
    }));
  }

  /**
   * Get all peptides excluding the given sample type
   * complexity
   * @param complexity the complexity to not get
   */
  public getAllNonComplexityPeptides(complexity: SampleTypeComplexity): Observable<Peptide[]> {
    return this.httpClient.get<Peptide[]>(this.peptideUrl).pipe(map(res => res));
  }

  public savePeptide(peptide: Peptide): Observable<Peptide> {
    const json = JSON.stringify(peptide);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Peptide>(this.peptideUrl, params, { headers: headers });
  }

  public sendPeptide(peptide: Peptide): void {
    this.peptideSelector.next(peptide);
  }

  public sendPeptideToList(peptide: Peptide): void {
    this.peptidePersist.next(peptide);
  }

  public findPeptide(peptide: Peptide): Observable<Peptide> {
    return this.httpClient.get<Peptide>(this.peptideUrl + '/' + peptide.sequence).pipe(map(res => res));
  }

  public updatePeptide(peptide: Peptide): Observable<Peptide> {
    const json = JSON.stringify(peptide);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<Peptide>(this.peptideUrl + '/' + peptide.sequence, params, { headers: headers });
  }
}
