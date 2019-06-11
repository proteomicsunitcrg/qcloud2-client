import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  constructor(private emailService: EmailService) { }

  // Var to emit the template
  @Output() templateEmiter = new EventEmitter<any>();

  // All the templates
  allTemplates: Array<String>;

  // The template to emit
  template: String;

  ngOnInit() {
    this.getAllTemplates();
  }
  /**
  * @summary Get all the templates from the server
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  */
  private getAllTemplates(): void {
    this.emailService.getAllTemplates().subscribe(
      (result) => {
        this.allTemplates = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /**
  * @summary Load the selected template
  * @author Marc Serret
  * @param {String} template to load
  * @since 1.0.0
  * @access public
  */
  public loadTemplate(template: String): void {
    this.emailService.loadTemplate(template).subscribe(
      (result) => {
        this.template = result;
        this.emitList();
      },
      (error) => {
        console.log(error);

      }
    );
  }

  /**
  * @summary Emits the template
  * @description Emits the template list to the father component
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  private emitList() {
    this.templateEmiter.emit(this.template);
  }

}
