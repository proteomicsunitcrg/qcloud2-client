import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileIntranetService } from '../../../services/file-intranet.service';
import { TOASTSETTING } from '../../../shared/ToastConfig';
import { NgxSmartModalService } from 'ngx-smart-modal';


declare var M: any;

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {

  constructor(
    private fileService: FileIntranetService,
    private toast: ToastrService,
    public ngxSmartModalService: NgxSmartModalService
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
    node: ''
  };
  fileData = [];
  /**
   * Data to populate the paginator
   */
  collection = { count: 0, data: [] };
  // Var to store the tooltip node
  nodeTooltip: string = '';

  tooltipOptions = {
    display: true,
    placement: 'top',
    "content-type": 'html'
  };

  ngOnInit() {
    this.getPage();
    M.AutoInit();
    M.updateTextFields();
    this.subscribeToElementsPage();
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
      
      // page -1 because at server-side the first page is the 0
      res => {
        console.log(res);
        this.collection.data = res.content;
        this.collection.count = res.totalElements;
        this.config.totalItems = res.totalElements;
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
    console.log(checksum);
    this.fileService.getFileData(checksum).subscribe(
      res => {
        this.fileData = res;
      },
      err => console.error(err)
    );
  }

}
