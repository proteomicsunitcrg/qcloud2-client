import { Component, OnInit } from '@angular/core';
import { PeptideService } from '../../../services/peptide.service';
import { ContextSourceCategory } from '../../../models/contextSourceCategory';
import { ContextSource } from '../../../models/contextSource';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-context-source-list',
  templateUrl: './context-source-list.component.html',
  styleUrls: ['./context-source-list.component.css']
})
export class ContextSourceListComponent implements OnInit {

  constructor(private peptideService: PeptideService) { }

  currentContextCategory: ContextSourceCategory;

  selects;

  materialSelects = [];

  contextSources = [];

  ngOnInit() {
    this.currentContextCategory = this.peptideService.getCurrentContextSourceCategory();
    this.loadContextSources(this.currentContextCategory);
    this.peptideService.selectedContextSourceCategory$.subscribe(
      (contextSourceCategory) => {
        this.loadContextSources(contextSourceCategory);
        this.currentContextCategory = contextSourceCategory;
      },
      (error) => console.log(error));
      
      this.peptideService.newContextSource$.subscribe(
      (contextSource) => this.contextSources.push(contextSource),
      (error)=> console.log(error));
    
    
  }
  private loadContextSources(currentContextSourceCategory: ContextSourceCategory): void {
    this.peptideService.getContextSourcesByCategory(currentContextSourceCategory).subscribe(
      (result) => {        
        this.loadContextSourcesList(result);
        this.currentContextCategory = currentContextSourceCategory;
      },
      (error) => {
        console.log(error);
      });
  }
  private loadContextSourcesList(contextSources: any[]): void {
    this.contextSources = [];
    contextSources.forEach((contextSource)=> this.contextSources.push(contextSource));
  }

  sendToDetail(contextSource: ContextSource):void {
    
  }
  
}
