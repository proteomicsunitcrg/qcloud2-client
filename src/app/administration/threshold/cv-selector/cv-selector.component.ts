import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CV } from '../../../models/cv';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';

@Component({
  selector: 'app-cv-selector',
  templateUrl: './cv-selector.component.html',
  styleUrls: ['./cv-selector.component.css']
})
export class CvSelectorComponent implements OnInit {

  constructor(private cvService: CvService,
    private categoryService: CategoryService,
    private modalService: ModalService) { }

  currentCategory: Category;
  cvs: CV[] = [];

  selectedCv: CV = new CV(null, null, null, null, null, null, []);

  limit = 10;

  page = 1;

  maxPages: number;

  filter: CV = new CV(null, '', null, '', '', false, []);

  showEnabledCvs = true;

  @Output() selectCVEvent: EventEmitter<CV> = new EventEmitter<CV>();
  @Output() closeThreshold: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.loadEnabledMainCV();
  }

  private loadEnabledMainCV(): void {
    this.categoryService.getMainCategory()
      .subscribe(
        (mainCategory) => {
          this.currentCategory = mainCategory;
          this.getCvListByCategoryFromServer(this.currentCategory);
        }
      );
  }

  /**
 * It gets the current CVs (only enable or all cvs)
 * from the database
 * @param category the category of the CVs to look for
 */
  private getCvListByCategoryFromServer(category: Category) {
    this.cvs = [];
    if (!this.showEnabledCvs) {
      this.cvService.getCvByCategory(category).subscribe(
        (result) => {
          this.loadCvList(result);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.cvService.getAllEnabledCVByCategory(category).subscribe(
        (result) => {
          this.loadCvList(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
    /**
   * Get the cvs by param and prepare the
   * filter and the pagination
   * @param cvs an array with the cvs to show
   */
  private loadCvList(cvs: CV[]): void {
    this.maxPages = cvs.length / 10;
    cvs.forEach(cv => {
      this.cvs.push(cv);
    });
  }

  reloadList(): void {
    this.getCvListByCategoryFromServer(this.currentCategory);
  }

  selectCV(cv: CV): void {
    this.selectedCv = cv;
    this.doAccept();
  }

  doAccept(): void {
    if (this.selectedCv.id === null) {
      this.modalService.openModal(new Modal('Error', 'Please select a CV in order to continue', 'Ok', null, 'selectCV', null));
    } else {
      this.selectCVEvent.emit(this.selectedCv);
    }
  }

  doBack(): void {
    this.closeThreshold.emit(true);
  }

}
