import { Component, OnDestroy, OnInit } from '@angular/core';
import { System } from '../../../../models/system';
import { SystemService } from '../../../../services/system.service';
import { FileService } from '../../../../services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FileIntranetService } from '../../../../services/file-intranet.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../../services/websocket.service';
import { Router } from '@angular/router';
import { File } from '../../../../models/file';
import { ContextSourceService } from '../../../../services/context-source.service';
import { SampleCompositionService } from '../../../../services/sample-composition.service';
import { Summary } from '../../../../models/summary';

declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private fileService: FileService, private systemService: SystemService, public ngxSmartModalService: NgxSmartModalService,
    private fileIntranetService: FileIntranetService, private webSocketService: WebsocketService, private routerService: Router, private contextSourceService: ContextSourceService,
    private sampleCompositionService: SampleCompositionService
  ) { }

  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  filename = '';
  labsystem = '';
  sampleType = '';

  collection = { count: 0, data: [] };

  labSystems: System[] = [];

  fileData = [];

  dashboardSubscription: Subscription;

  summaries: Summary[] = [];
  
  currentFile: File = null;
  
  displayedParameters: string[] = [];

  ngOnInit() {
    this.getNodeLs();
    this.getPage();
    this.subscribeToDashboardIntranet();
  }

  ngOnDestroy() {
    this.dashboardSubscription.unsubscribe();
  }

  public getPage(): void {
    this.fileService.getAllFilesByNode(this.config.currentPage - 1, this.config.itemsPerPage, this.filename, this.labsystem, this.sampleType).subscribe(
      res => {
        this.collection.data = res.content;
        this.collection.count = res.totalElements;
        this.config.totalItems = res.totalElements;
        // for (const file of this.collection.data) {
        //   this.fileService.getFileStatusByChecksum(file.checksum).subscribe(
        //     res => {
        //       file.isOk = res;
        //     },
        //     err => {
        //       console.error(err);
        //     }
        //   );
        // }
      },
      err => {
        console.error(err);
      }
    );
  }

  private getNodeLs(): void {
    this.systemService.getSystems().subscribe(
      res => {
        this.labSystems = res.filter(item => item.active);
        setTimeout(() => {  // The timeout is necessary because the select isnt instant
          M.AutoInit();
        }, 500);
      },
      err => {
        console.error(err);
      }
    );
  }

  public cleanFilters(): void {
    this.filename = '';
  }

  /**
* @summary The event launched when the user changes a page
* @author Marc Serret
* @since 1.0.0
* @access public
* @param number the new page to display
*/
  public pageChanged(event: number) {
    this.config.currentPage = event;
    this.getPage();
  }


  public viewData(checksum: string): void {
    this.fileIntranetService.getFileData(checksum).subscribe(
      res => {
        this.fileData = res;
      },
      err => console.error(err)
    );
  }

  private subscribeToDashboardIntranet(): void {
    this.dashboardSubscription = this.webSocketService.updateDashboard$.subscribe(
      res => {
        this.getPage();
      },
      err => {
        console.error(err);
      }
    );
  }

  public goToPlot(file: File): void {
    this.routerService.navigate([`/application/view/instrument/`, file.labSystem.apiKey], { queryParams: { checksum: file.checksum } });
  }

  public goToResults(file: File): void {
    this.currentFile = file;
    console.log('========== DEBUG goToResults START ==========');
    console.log('File sample type:', file.sampleType.name);
    console.log('Is HeLa type:', this.isHelaType(file));
    
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        console.log('--- Response from getSummary ---');
        console.log('Total summaries received:', res.length);
        console.log('Full response object:', JSON.stringify(res, null, 2));
        
        if (res.length > 0) {
          console.log('First summary sequence:', res[0].sequence);
          console.log('First summary values count:', res[0].values.length);
          console.log('All parameter names in first summary:');
          res[0].values.forEach((v, idx) => {
            console.log(`  ${idx}: "${v.param.name}" = ${v.calculatedValue}`);
          });
        }
        
        this.summaries = res;
        // For HELA types, filter to only show protein/peptide identification metrics
        if (this.isHelaType(file)) {
          console.log('--- Applying HeLa Filtering ---');
          console.log('Filtering based on SEQUENCE field (not param.name)');
          this.displayedParameters = [];
          
          // Filter summaries to only include protein/peptide related ones (check the sequence field)
          this.summaries = res.filter((summary, summaryIdx) => {
            const sequenceName = summary.sequence.toLowerCase();
            const includesProtein = sequenceName.includes('protein');
            const includesPeptide = sequenceName.includes('peptide');
            const shouldKeep = includesProtein || includesPeptide;
            
            console.log(`Summary ${summaryIdx}: "${summary.sequence}"`);
            console.log(`  Lowercase: "${sequenceName}"`);
            console.log(`  Includes 'protein': ${includesProtein}`);
            console.log(`  Includes 'peptide': ${includesPeptide}`);
            console.log(`  Keep this summary: ${shouldKeep}`);
            if (shouldKeep && summary.values.length > 0) {
              console.log(`  Value: ${summary.values[0].calculatedValue}`);
            }
            
            return shouldKeep;
          }).map(summary => {
            // Simplify the sequence names for display and clean peptide sequences
            let displayName = summary.sequence;
            if (summary.sequence.toLowerCase().includes('protein')) {
              displayName = 'Identified proteins';
            } else if (summary.sequence.toLowerCase().includes('peptide')) {
              displayName = 'Identified peptides';
            } else {
              // For actual peptide sequences, clean modifications and underscores
              displayName = this.cleanPeptideSequence(summary.sequence);
            }
            
            return {
              sequence: displayName,
              values: summary.values
            };
          });
          
          console.log('--- After Filtering ---');
          console.log('Final summaries count:', this.summaries.length);
          console.log('Final summaries object:', JSON.stringify(this.summaries, null, 2));
        } else {
          console.log('--- No Filtering (BSA or other type) ---');
          this.displayedParameters = [];
          // Clean peptide sequences for BSA samples too
          this.summaries = res.map(summary => ({
            sequence: this.cleanPeptideSequence(summary.sequence),
            values: summary.values
          }));
        }
        
        console.log('========== DEBUG goToResults END ==========');
        console.log('About to open modal with summaries:', this.summaries);
        this.ngxSmartModalService.getModal('dataModal').open()
      },
      err => {
        console.error('ERROR in getSummary:', err);
      }
    );
  }
  
  private isHelaType(file: File): boolean {
    const sampleTypeName = file.sampleType.name.toUpperCase();
    // Check for HeLa, HeLa DIA, and QC4L (HeLa Isotopologues)
    return sampleTypeName.includes('HELA') || sampleTypeName === 'QC4L';
  }

  /**
   * Clean peptide sequence by removing modifications and underscores
   * Example: "EAC(Carbamidomethyl)FAVEGPK" -> "EACFAVEGPK"
   * Example: "PEPTIDE_SEQUENCE" -> "PEPTIDESEQUENCE"
   */
  private cleanPeptideSequence(sequence: string): string {
    // Remove anything in parentheses (modifications like "(Carbamidomethyl)")
    let cleaned = sequence.replace(/\([^)]*\)/g, '');
    // Remove underscores
    cleaned = cleaned.replace(/_/g, '');
    return cleaned;
  }

  public downloadData(file: File): void {
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        console.log('========== DEBUG downloadData START ==========');
        console.log('Total items received:', res.length);
        
        // Debug: Print first few items to understand structure
        res.slice(0, 5).forEach((item, idx) => {
          console.log(`Item ${idx}:`, {
            sequence: item.sequence,
            valuesCount: item.values.length,
            paramNames: item.values.map(v => v.param.name)
          });
        });
        
        // Clean peptide sequences (remove modifications and underscores)
        const allData = res.map(summary => ({
          sequence: this.cleanPeptideSequence(summary.sequence),
          originalSequence: summary.sequence,
          values: summary.values
        }));
        
        // Separate totals (summary metrics) from peptides (actual sequences)
        // Check if the sequence looks like a metric name (contains spaces, "MS", "IT", "TIC", etc.)
        // or if it's an actual peptide sequence (all uppercase letters)
        const totals = allData.filter(item => {
          const isMetric = this.isSummaryMetric(item.originalSequence);
          console.log(`"${item.originalSequence}" -> ${isMetric ? 'TOTAL' : 'PEPTIDE'}`);
          return isMetric;
        });
        const peptides = allData.filter(item => !this.isSummaryMetric(item.originalSequence));
        
        console.log('Totals count:', totals.length);
        console.log('Peptides count:', peptides.length);
        console.log('========== DEBUG downloadData END ==========');
        
        // Download totals CSV (if any)
        if (totals.length > 0) {
          const totalsCSV = this.mountTotalsCSV(totals);
          this.downloadCSV(totalsCSV, file, '_totals');
        }
        
        // Download peptides CSV (if any)
        if (peptides.length > 0) {
          const peptidesCSV = this.mountPeptidesCSV(peptides);
          this.downloadCSV(peptidesCSV, file, '_peptides');
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * Determine if a sequence is a summary metric or an actual peptide sequence
   * Summary metrics contain: spaces, "MS", "IT", "TIC", "PSM", "number", "Total", "Median", "Sum", etc.
   * Peptide sequences are: uppercase letters with optional modifications like (Carbamidomethyl) and underscores
   */
  private isSummaryMetric(sequence: string): boolean {
    // Check for common metric keywords
    const metricKeywords = [
      'MS1', 'MS2', 'IT ', 'TIC', 'PSM', 'Spectral', 'Total number',
      'Median', 'Sum ', 'FWHM', 'Points', 'accuracy', 
      'identified', 'protein', 'uniquely'
    ];
    
    const upperSequence = sequence.toUpperCase();
    
    // If it contains any metric keywords, it's a summary metric
    for (const keyword of metricKeywords) {
      if (upperSequence.includes(keyword.toUpperCase())) {
        return true;
      }
    }
    
    // If it contains spaces, it's likely a metric name
    if (sequence.includes(' ')) {
      return true;
    }
    
    // Check if it's a peptide sequence:
    // - Uppercase letters (A-Z)
    // - May contain underscores (_)
    // - May contain modifications in parentheses like (Carbamidomethyl)
    // Pattern: uppercase letters, underscores, and anything in parentheses (including lowercase)
    const peptidePattern = /^[A-Z_()a-z]+$/;
    
    // Additional check: if it has parentheses, make sure they contain modification names (not metrics)
    if (sequence.includes('(') && peptidePattern.test(sequence)) {
      // It's a peptide with modifications
      return false;
    }
    
    // If it matches the peptide pattern (all uppercase + underscores, no parentheses)
    if (peptidePattern.test(sequence) && !sequence.includes('(')) {
      return false;
    }
    
    // Default to summary metric if uncertain
    return true;
  }

  /**
   * Generate CSV for totals/summary metrics (2-column format)
   * Format: parameter,value
   */
  private mountTotalsCSV(summary: Summary[]): string {
    const separator = ',';
    const headers = 'parameter' + separator + 'value\n';
    let csvText = '';
    
    for (const item of summary) {
      const cleanedSequence = this.cleanPeptideSequence(item.sequence);
      const value = item.values[0].calculatedValue;
      csvText += cleanedSequence + separator + value + '\n';
    }
    
    return headers + csvText;
  }

  /**
   * Generate CSV for peptides with multiple parameters (multi-column format)
   * Format: sequence,param1,param2,...
   */
  private mountPeptidesCSV(summary: Summary[]): string {
    const separator = ',';
    
    // Collect all unique parameter names
    const allParamNamesSet = new Set<string>();
    for (const peptide of summary) {
      for (const value of peptide.values) {
        allParamNamesSet.add(value.param.name);
      }
    }
    const paramNames = Array.from(allParamNamesSet);
    
    // Filter out columns that are completely empty
    const usedParamNames = paramNames.filter(paramName => {
      return summary.some(peptide => {
        const value = this.getDataFromParam(peptide.values, paramName);
        return value && value.calculatedValue !== null && value.calculatedValue !== '';
      });
    });
    
    // Build header row with only used columns
    const headers = 'sequence' + separator + usedParamNames.join(separator) + '\n';
    
    // Build data rows
    let csvText = '';
    for (const peptide of summary) {
      const cleanedSequence = this.cleanPeptideSequence(peptide.sequence);
      const row = [cleanedSequence];
      for (const paramName of usedParamNames) {
        const value = this.getDataFromParam(peptide.values, paramName);
        row.push(value ? value.calculatedValue : '');
      }
      csvText += row.join(separator) + '\n';
    }
    
    return headers + csvText;
  }

  private downloadCSV(csv: string, file: File, suffix: string = '') {
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${file.filename}${suffix}.csv`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  private getDataFromParam(valueList: any[], target: string): any {
    for (const value of valueList) {
      if (value['param']['name'] === target) {
        return value;
      }
    }
  }

}