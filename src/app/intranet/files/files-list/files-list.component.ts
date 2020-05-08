import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileIntranetService } from '../../../services/file-intranet.service';
import { TOASTSETTING } from '../../../shared/ToastConfig';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { WebsocketService } from '../../../services/websocket.service';


declare var M: any;

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {

  constructor(
    private webSocketService: WebsocketService,
    private fileService: FileIntranetService,
    private toast: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
  ) { }

  // Variable to host the number in items in the page
  private numberOfElements = 10;
  // The event emmiter to track this var changes
  numberOfElementsEmitter: EventEmitter<number> = new EventEmitter();
  /**
   * Variables binded to inputs
   */
  name = '';
  checksum = '';
  labsystem = '';
  sampleType = '';
  node = '';
  email = '';
  exact = 0; // 0 = labsystem name is a like; 1 = labsystem name is ===
  // dateStart = moment().format('YYYY-MM-DD');
  // dateEnd = moment().format('YYYY-MM-DD');
  /**
   * Paginator config
   */
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  /**
   * Parameters to send to back-end
   */
  filter = {
    name: '',
    checksum: '',
    labsystem: '',
    sampleType: '',
    node: '',
    email: ''
  };
  fileData = [];
  /**
   * Data to populate the paginator
   */
  collection = { count: 0, data: [] };
  // Var to store the tooltip node
  nodeTooltip = '';
  // Tooltip options
  tooltipOptions = {
    display: true,
    placement: 'top',
    'content-type': 'html'
  };
  // var to handle the autocompletion
  autoCompleteInstance: any;
  // If true skip the request to get the nodes (faster)
  highPerformance = false;
  webSocket = true;
  ngOnInit() {
    this.getPage();
    M.AutoInit();
    M.updateTextFields();
    this.subscribeToElementsPage();
    const elems = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elems, { minLength: 3 });
    this.autoCompleteInstance = M.Autocomplete.getInstance(elems[0]);
    this.subscribeToWebSocket();
  }

  /**
  * @summary Launches the request to fetch the page. Uses the filters to perform the search
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  * @param number = -1 Determines if the labsystem is a like SQL search or a normal one.
  */
  public getPage(exact: number = -1): void { // if exact is -1 means that we should mamtain the same value 4 exact
    if (exact !== -1) {
      this.exact = exact;
    }
    this.prepareParams();
    this.fileService.getPage(this.config.currentPage - 1, this.filter, this.exact, this.numberOfElements).subscribe(
      pageFile => {
        if (!this.highPerformance) {
          for (const file of pageFile.content) {
            this.fileService.getNodeAndFileStatusByDataSourceApiKeyAndFileApiKey(file.labSystem.dataSources[1].apiKey, file.checksum)
              .subscribe(
                res => {
                  file.labSystem.node = res.node.name;
                  file.labSystem.isOk = res.dataOk;
                  file.labSystem.nodeApiKey = res.node.apiKey;
                },
                err => {
                  console.error(err);
                }
              );
          }
        }
        this.collection.data = pageFile.content;
        this.collection.count = pageFile.totalElements;
        this.config.totalItems = pageFile.totalElements;
      },
      err => {
        console.error(err);
      }
    );
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

  /**
  * @summary Prepate the search parametes to sent to the backend
  * If an input is black set the filter to null, the backend translates the null to blank
  * I need to do this because i can't send and empty param in a HTTP request
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  */
  private prepareParams(): void {
    if (this.name.trim() === '') {
      this.filter.name = 'null';
    } else {
      this.filter.name = this.name;
    }
    if (this.checksum.trim() === '') {
      this.filter.checksum = 'null';
    } else {
      this.filter.checksum = this.checksum;
    }
    if (this.labsystem.trim() === '') {
      this.filter.labsystem = 'null';
    } else {
      this.filter.labsystem = this.labsystem;
    }
    if (this.sampleType.trim() === '') {
      this.filter.sampleType = 'null';
    } else {
      this.filter.sampleType = this.sampleType;
    }
    if (this.node.trim() === '') {
      this.filter.node = 'null';
    } else {
      this.filter.node = this.node;
    }
    if ((<HTMLInputElement>document.getElementById('email')).value === '') {
      this.filter.email = 'null';
    } else {
      this.filter.email = (<HTMLInputElement>document.getElementById('email')).value;
    }
  }

  /**
  * @summary Asks for confirmation and then deletes a file
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  * @param string File checksum to delete
  */
  public deleteFile(checksum: string): void {
    if (!confirm('Are you really sure?')) {
      return;
    }
    this.fileService.deleteFile(checksum).subscribe(
      (res: boolean) => {
        if (res) {
          this.toast.success('File deleted', null, TOASTSETTING);
          this.getPage();
        } else {
          this.toast.error('Server error', null, TOASTSETTING);
        }
      },
      err => console.error(err)
    );
  }

  /**
  * @summary Subscribes the component to the event
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  */
  private subscribeToElementsPage(): void {
    this.numberOfElementsEmitter.subscribe(() =>
      this.getPage()
    );
  }

  /**
  * @summary Just changes the numberOfElemenst value and emmits his event
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  * @param number Number to assign
  */
  public stateNumberOfElementsPerPage(val: number) {
    this.numberOfElements = val;
    this.config.itemsPerPage = val;
    this.numberOfElementsEmitter.emit(this.numberOfElements);
  }

  public handleTooltipEvents(event: any, msApiKey: string): void {
    if (event !== 'show') {
      return;
    }
    this.fileService.getNodeByDataSourceApiKey(msApiKey).subscribe(
      (res) => {
        this.nodeTooltip = res.name;
      },
      () => this.toast.error('', 'Error getting the node')
    );
  }

  public viewData(checksum: string): void {
    this.fileService.getFileData(checksum).subscribe(
      res => {
        this.fileData = res;
      },
      err => console.error(err)
    );
  }

  public getUsers(): void {
    if (this.email.trim().length >= 3) {
      this.fileService.getUsers(this.email).subscribe(
        res => {
          const data = {};
          for (const user of res) {
            data[user.email] = null;
          }
          this.autoCompleteInstance.updateData(data);
        },
        err => console.error(err)
      );
    } else {
      this.autoCompleteInstance.updateData({});
    }
  }

  public getJSON(): void {
    this.prepareParams();
    this.fileService.getJSON(this.filter, this.exact).subscribe(
      res => {
        this.mountDownload(res, `${moment().format('YYYY-MM-DD_HH-mm-ss')}_search.json`);
      },
      err => console.error(err)
    );
  }

  private mountDownload(res: File[], name: string): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(res));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', name);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  private subscribeToWebSocket() {
    this.webSocketService.updateIntranet$.subscribe(
      () => {
        if (this.webSocket) {
          this.getPage();
        }
      },
      (err) => console.error(err)
    );
  }

  /**
   * Method just to check the webSocket
   *
   */
  // public trySocket() {
  //   this.fileService.trySocket().subscribe(
  //     () => {
  //       this.getPage();
  //     },
  //     err => console.error(err)
  //   );
  // }

  public navigateTo(nodeApiKey): void {
    this.router.navigate(['/application/intranet/node', nodeApiKey]);
  }

  public cleanFilters(): void {
    this.name = '';
    this.checksum = '';
    this.node = '';
    this.labsystem = '';
    this.sampleType = '';
    this.email = '';
  }
}
