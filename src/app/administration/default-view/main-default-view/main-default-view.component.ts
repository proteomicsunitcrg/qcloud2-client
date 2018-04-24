import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewService } from '../../../services/view.service';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
import { View } from '../../../models/view';

/**
 * Default view component
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-main-default-view',
  templateUrl: './main-default-view.component.html',
  styleUrls: ['./main-default-view.component.css']
})
export class MainDefaultViewComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute,
    private viewService: ViewService,
    private modalService: ModalService) { }

  categories: Category[] = [];
  selectedCategory: Category;

  selectedCV: CV;

  ngOnInit() {
    this.loadCategories();
    this.subscribeToCV();
    this.subscribeToModalAction();
  }

  private subscribeToCV(): void {
    this.cvService.selectedChartCv$
      .subscribe(
        (cv) => {
          this.selectedCV = cv;
        }
      )
  }
  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (result)=> {        
        this.loadCategoriesIntoList(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  private loadCategoriesIntoList(categories: Category[]) {
    categories.forEach(
      (category) => {
        this.categories.push(new Category(category.id,category.name,category.isMain));        
      }
    );
    this.selectedCategory = this.categories[0];
    this.categoryService.selectCategory(this.selectedCategory);    
  }
  /**
   * Handle the creation of a new default chart
   * Before that it checks if there is a previous
   * default chart for that CV
   */
  goToDefaultChartEdit(): void {
    // Check if a view already exists for this CV
    this.viewService.getDefaultViewNameByCV(this.selectedCV)
      .subscribe(
        (res) => {
          if(res===null) {
            this.router.navigate(['/application/administration/views/cv',this.selectedCV.cvid]);
          }else {
            this.modalService.openModal(new Modal('Information',
              'A default chart for that instrument already exists. Do you want to edit it?',
              'Yes','No','newLayout',null));
          }
        
        }
      )
  }
  /**
   * Handle the modal responses
   */
  private subscribeToModalAction(): void {
    this.modalService.selectedAction$
      .subscribe(
        (action) => {
          switch(action.modalAction) {
            case 'newLayout':
              if(action.userAction==='accept') {
                this.router.navigate(['/application/administration/views/cv',this.selectedCV.cvid]);
              }
              break;
            default:
              console.log('not defined action');
              break;
          }
        }
      )
  }



}
