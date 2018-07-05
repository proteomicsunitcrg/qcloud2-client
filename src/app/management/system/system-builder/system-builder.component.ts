import { Component, OnInit, OnDestroy } from '@angular/core';
import { System } from '../../../models/system';
import { DataSource } from '../../../models/dataSource';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { delay } from 'q';
import { DataSourceService } from '../../../services/data-source.service';
import { SystemService } from '../../../services/system.service';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
import { Subscription } from 'rxjs';
declare var M: any;
@Component({
  selector: 'app-system-builder',
  templateUrl: './system-builder.component.html',
  styleUrls: ['./system-builder.component.css']
})
export class SystemBuilderComponent implements OnInit, OnDestroy {

  constructor(private categoryService: CategoryService,
    private dataSourceService: DataSourceService,
    private systemService: SystemService,
    private modalService: ModalService) { }

  system: System = new System(null, null, null, null, null);

  categories: Category[];

  updating = false;

  /**
   * This var is used for calculate the numbers of materialize
   * columns based on the number of categories +1 (name input)
   */
  materializeColumns: number;
  /**
   * Current node data sources
   */
  nodeDataSources: any[] = [];

  /**
   * System data sources
   */
  systemDataSources: any[] = [];

  /**
   * Selected data source, used only for the
   * ngModel
   */
  selectedDataSources: any[] = [];

  selectedSystem$: Subscription;

  ngOnInit() {
    this.loadCategories();
    M.updateTextFields();
    this.subscribeToSelectedSystem();
  }
  ngOnDestroy() {
    this.selectedSystem$.unsubscribe();
  }

  private subscribeToSelectedSystem(): void {
    this.selectedSystem$ = this.systemService.selectedSystem$
      .subscribe((system) => {
        this.loadSystem(system);
      });
  }

  private loadSystem(system: System): void {
    // clean the arrays
    this.resetDataSources();
    // get the datasources of the system
    this.system.name = system.name;
    this.system.id = system.id;
    this.system.apiKey = system.apiKey;
    this.updating = true;
    system.dataSources.forEach(
      (dataSource) => {
        this.addDataSource(dataSource);
      }
    );
  }

  private loadCategories(): void {
    this.categories = [];
    this.categoryService.getCategories()
      .subscribe(
        (categories) => {
          categories.forEach(
            (category) => {
              // Initialize the arrays with the categories
              this.categories.push(category);
              /*
              this.nodeDataSources[category.apiKey] = [];
              this.systemDataSources[category.apiKey] = [];
              this.selectedDataSources[category.apiKey] = [];
              */
            });
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.loadNodeDataSources();
          this.materializeColumns = 12 / (this.categories.length + 1);

        }
      );
  }

  private loadNodeDataSources(): void {
    this.categories.forEach(
      (category) => {
        this.nodeDataSources[category.apiKey] = [];
        this.systemDataSources[category.apiKey] = [];
        this.selectedDataSources[category.apiKey] = [];
        this.dataSourceService.getDataSourcesByCategory(category)
          .subscribe(
            (dataSources) => {
              dataSources.forEach(
                (dataSource) => {
                  this.nodeDataSources[category.apiKey].push(dataSource);
                }
              );
            }, (error) => {
              console.log(error);
            },
            () => {
              delay(100).then(
                () => M.AutoInit()
              );
            }
          );
      }
    );
  }
  /**
   * Adds a datasource into the selected data sources from the via ngModel
   * @param category the category of the datasource, it comes from the DOM and
   * takes the value of the for loop.
   */
  addDataSourceFromCategory(category: Category): void {
    if (this.selectedDataSources[category.apiKey].length !== 0) {
      this.systemDataSources[category.apiKey].push(this.selectedDataSources[category.apiKey]);
      // remove element from array
      const dataSourceIndex = this.nodeDataSources[category.apiKey].findIndex((dataSource) => {
        return dataSource.id === this.selectedDataSources[category.apiKey].id;
      });
      this.nodeDataSources[category.apiKey].splice(dataSourceIndex, 1);
      delay(1).then(
        () => M.AutoInit()
      );
    }
  }
  /**
   * Add a datasource into the selected system data sources.
   * @param dataSource
   */
  private addDataSource(dataSource: DataSource): void {
    this.systemDataSources[dataSource.cv.category.apiKey].push(dataSource);
    const dataSourceIndex = this.nodeDataSources[dataSource.cv.category.apiKey].findIndex((ds) => {
      return ds.id === dataSource.id;
    });
    this.nodeDataSources[dataSource.cv.category.apiKey].splice(dataSourceIndex, 1);
    delay(1).then(
      () => M.AutoInit()
    );
  }

  removeDataSourceFromSystem(dataSource: DataSource, category: Category): void {
    const dataSourceIndex = this.systemDataSources[category.apiKey].findIndex((ds) => {
      return dataSource.id === ds.id;
    });
    this.nodeDataSources[category.apiKey].push(this.systemDataSources[category.apiKey].splice(dataSourceIndex, 1)[0]);
    delay(100).then(
      () => M.AutoInit()
    );
  }

  doSave(): void {
    // check if there is a name, and at least one data source of each category
    let formOk = true;
    let categoriesText = '';
    if (this.system.name === '' || this.system.name == null) {
      formOk = false;
    }

    this.categories.forEach(
      (category) => {
        categoriesText += category.name + ' and a ';
        if (this.systemDataSources[category.apiKey].length === 0) {
          formOk = false;
        }
      });
    categoriesText = categoriesText.slice(0, -7);
    if (!formOk) {
      this.modalService.openModal(new Modal(
        'Missing values',
        'In order to save a system you need at least a system name and a ' + categoriesText,
        'Ok', null, null, null));
    } else {
      this.saveSystem();
    }
  }

  doUpdate(): void {
    this.systemService.updateSystem(this.system)
      .subscribe(
        (res) => {
          this.systemService.reloadList();
          this.loadNodeDataSources();
          this.doCancel();
          M.toast({html: 'System updated!'});
        },
        (err) => {
          console.log(err);
        }
      );
  }

  private saveSystem(): void {
    this.systemService.saveSystem(this.system)
      .subscribe(
        (system) => {
          /**
           * when the system is save is time to save the datasources
           * the only way to recover node systems is via system data sources as
           * it is specified in the backend documentation.
           * Check the related classes and take a look at the system repository
          */
          const ds = [];
          for (const key in this.systemDataSources) {
            if (this.systemDataSources[key].length > 0) {
              this.systemDataSources[key].forEach(
                (dataSources) => {
                  ds.push(dataSources);
                });
            }
          }

          this.systemService.saveSystemDataSources(system, ds)
            .subscribe(
              () => {
                // toast and reset form
                M.toast({ html: 'System saved' });
                this.loadNodeDataSources();
                this.system.dataSources = ds;
                this.systemService.reloadList();
                this.system = new System(null, null, null, null, null);
                this.updating = false;
              },
              (err) => console.log(err)
            );
        }
      );
  }

  doCancel(): void {
    this.resetDataSources();
    this.loadNodeDataSources();
    this.system = new System(null, null, null, null, null);
    this.updating = false;

  }

  resetDataSources(): void {
    this.categories.forEach(
      (category) => {
        this.systemDataSources[category.apiKey] = [];
        this.selectedDataSources[category.apiKey] = [];
      }
    );
  }

}
