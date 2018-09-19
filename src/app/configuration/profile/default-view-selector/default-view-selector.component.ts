import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { SystemService } from '../../../services/system.service';
import { UserDefaultViewService } from '../../../services/user-default-view.service';
import { System } from '../../../models/system';
import { delay } from 'q';
import { ViewService } from '../../../services/view.service';
import { View } from '../../../models/view';
import { UserDefaultView } from '../../../models/userDefaultView';

declare var M: any;

@Component({
  selector: 'app-default-view-selector',
  templateUrl: './default-view-selector.component.html',
  styleUrls: ['./default-view-selector.component.css']
})
export class DefaultViewSelectorComponent implements OnInit {

  defaultView: boolean;

  customViews = false;

  viewsList: { 'name': string, 'apiKey': string }[];

  selectedView: { 'name': string, 'apiKey': string } = {'name': null, 'apiKey': null};

  labSystems: System[];
  userViews: View[];

  constructor(private systemService: SystemService,
    private userDefaultViewService: UserDefaultViewService,
    private viewService: ViewService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.defaultView = true;
    this.getUserDefaultView();
    this.loadViews();
  }

  private getUserDefaultView(): void {
    this.userDefaultViewService.findDefaultView()
      .subscribe(
        (userDefaultView) => {
          if (userDefaultView === null) {
            this.defaultView = true;
          } else {
            this.defaultView = false;
            if (userDefaultView.viewType === 'INSTRUMENT') {
              this.customViews = false;
              this.selectedView = { 'name': userDefaultView.labSystem.name, 'apiKey': userDefaultView.labSystem.apiKey };
            } else {
              this.customViews = true;
              this.selectedView = { 'name': userDefaultView.view.name, 'apiKey': userDefaultView.view.apiKey };
            }
          }
        }, err => console.log(err)
      );
  }

  updateDefaultView(): void {
    this.viewsList = [];
    if (!this.customViews) {
      this.labSystems.forEach(
        (ls) => {
          this.viewsList.push({ 'name': ls.name, 'apiKey': ls.apiKey });
        }
      );
    } else {
      this.userViews.forEach(
        (userView) => {
          this.viewsList.push({ 'name': userView.name, 'apiKey': userView.apiKey });
        }
      );
    }
    this.enableSelect();
  }

  updateSelect(): void {
    this.updateDefaultView();
  }

  private enableSelect(): void {
    this.refresh();
    const select = document.getElementById('view_list');
    const instance = M.FormSelect.init(select, {});
  }

  private loadViews(): void {
    this.systemService.getSystems()
      .subscribe(
        (labSystems) => {
          this.labSystems = labSystems;
        }, err => console.log('views', err),
        () => {
          this.viewService.getUserViews()
            .subscribe(
              (views) => {
                this.userViews = views;
              }, err => console.log('userviews', err),
              () => {
                this.updateDefaultView();
              }
            );
        }
      );
  }

   private refresh(): void {
    const self = this;
    self.ref.detectChanges();
  }

  onSubmit(): void {
    const view = new View(null, null, null, null, null, null, this.selectedView.apiKey);
    let type = 'DEFAULT';
    if (this.customViews) {
      type = 'USER';
    } else {
      type = 'INSTRUMENT';
    }
    if (this.defaultView) {
      type = 'DEFAULT';
    }
    const userDefaultView = new UserDefaultView(type, view, null);
    this.userDefaultViewService.saveUserDefaultView(userDefaultView)
      .subscribe(
        (res) => {
          M.toast({html: 'Default view saved!'});
        }, err => console.log('err', err)
      );
  }


}
