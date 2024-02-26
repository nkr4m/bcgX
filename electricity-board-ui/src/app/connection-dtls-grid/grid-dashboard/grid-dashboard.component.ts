
import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from './../../shared/models/page';
import { Connections } from 'src/app/shared/models/connections';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionDtlsModalComponent } from './connection-dtls-modal/connection-dtls-modal.component';
import { ConnectionService } from './../../shared/services/connection-service/connection.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-grid-dashboard',
  templateUrl: './grid-dashboard.component.html',
  styleUrls: ['./grid-dashboard.component.css']
})
export class GridDashboardComponent implements OnInit {

  @ViewChild('idInput', { static: true }) idInput!: ElementRef;

  range!: FormGroup;
  pageDtls!: Page;
  connectionDtls !: Connections[];
  isPrevDisabled: boolean = true;
  isNextDisabled: boolean = true;
  currentPage!: number;
  totalPages!: number;
  private searchSubject = new Subject<number>();
  searchFlag: boolean = false;


  constructor(private connService: ConnectionService, private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.searchSubject
      .pipe(debounceTime(400))
      .subscribe(value => {

        if (value == null || value == undefined) {
          this.goToPage()
          return;
        }
        this.searchWithId(value)
      });

    this.range = this.fb.group({
      start: [null],
      end: [null],
    });
  }

  ngOnInit(): void {
    this.goToPage();
  }

  /**
   * Navigates to a specific page in the connection list.
   * If searchFlag is false, it fetches from all the connections connections.
   * If searchFlag is true, it performs a search with date range.
   *
   * @param {number} pageNumber - The page number to navigate to (default is 0).
   * @param {number} pageSize - The number of items per page (default is 10).
   */
  goToPage(pageNumber: number = 0, pageSize: number = 10) {
    if (this.searchFlag == false) {
      this.connService.fetchConnections(pageNumber, pageSize).subscribe({
        next: (data) => {
          this.pageDtls = data;
          this.totalPages = data.totalPages;
          this.currentPage = data.number
          this.connectionDtls = data.content;
          this.pageDtls.first == true ? this.isPrevDisabled = true : this.isPrevDisabled = false;
          this.pageDtls.last == true ? this.isNextDisabled = true : this.isNextDisabled = false;
        },
        error: (error) => {
          this.openSnackBar('Something went wrong, Please try again.');
        }
      })
    } else {
      this.searchWithDateRange(pageNumber);
    }
  }



  /**
   * Handles the input change event for search with id feature
   * Updates the searchFlag and triggers a search with the entered value.
   */
  onInputChanged(): void {
    this.searchFlag = false;
    this.searchSubject.next(this.idInput.nativeElement.value == "" ? undefined : this.idInput.nativeElement.value);
  }


  /**
   * Handles server call when the searchSubject changes 
   * Triggers a search with the entered value.
   */
  searchWithId(value: number) {
    this.range.reset({
      start: null,
      end: null,
    });
    this.connService.fetchConnectionWithId(value).subscribe(
      (data) => {
        this.currentPage = 0
        this.totalPages = 1
        let usrArr: Connections[] = [];
        usrArr.push(data);
        this.connectionDtls = usrArr;
        this.isPrevDisabled = true;
        this.isNextDisabled = true;

      },
      (error) => {
        // console.log(error)
        // Handle errors if any
        this.connectionDtls = []
        if (error.error.errorMessage != null) {
          this.openSnackBar(error.error.errorMessage);
          let usrArr: Connections[] = [];
          this.connectionDtls = usrArr;
          this.isPrevDisabled = true;
          this.isNextDisabled = true;
        } else if (error.status == 400) {
          this.openSnackBar('Provided field is not a valid search term, Please format and try again.');
        } else {
          this.openSnackBar('Something went wrong, Please try again.');
        }
      }


    )
  }

  /**
   * Handles the date search by clearing the ID input, setting the searchFlag to true,
   * and triggering a page navigation to the first page.
   */
  handleDateSearch() {
    this.idInput.nativeElement.value = "";
    this.searchFlag = true;
    this.goToPage(0);
  }

  searchWithDateRange(pageNumber: number) {
    const startDate = this.range.value.start;
    const endDate = this.range.value.end;
    const formattedStartDate = startDate ? this.formatDate(startDate) : '';
    const formattedEndDate = endDate ? this.formatDate(endDate) : '';

    this.connService.fetchConnWithDateRange(formattedStartDate, formattedEndDate, pageNumber).subscribe(
      (data: Page) => {
        this.updatePageContents(data);
      },
      (error) => {
        this.connectionDtls = []
        if (error.error.errorMessage != null) {
          this.openSnackBar(error.error.errorMessage);
          let usrArr: Connections[] = [];
          this.connectionDtls = usrArr;
          this.isPrevDisabled = true;
          this.isNextDisabled = true;
          this.currentPage = 0;
          this.totalPages = 0;
        } else if (error.status == 400) {
          this.openSnackBar('Provided field is not a valid search term, Please format and try again.');
        } else {
          this.openSnackBar('Something went wrong, Please try again.');
        }
      }
    );
  }

  private formatDate(date: Date): string {
    if (date && !isNaN(date.getTime())) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    } else {
      return '';
    }
  }

  /**
 * Updates the page details and connection details based on the provided Page object - for usage with the date range serach.
 * Also updates flags to enable/disable previous and next buttons based on the current page.
 *
 * @param {Page} data - The Page object containing information about the current page.
 */
  updatePageContents(data: Page) {
    this.pageDtls = data;
    this.totalPages = data.totalPages;
    this.currentPage = data.number
    this.connectionDtls = data.content;
    this.pageDtls.first == true ? this.isPrevDisabled = true : this.isPrevDisabled = false;
    this.pageDtls.last == true ? this.isNextDisabled = true : this.isNextDisabled = false;
  }

  openUserModal(connDtls: Connections) {
    const dialogRef = this.dialog.open(ConnectionDtlsModalComponent, {
      data: {
        user: connDtls,
      },
      width: '95%',
      height: '95%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Check if there is any data returned from the modal
      if (result && result.refreshed) {
        this.goToPage(this.currentPage)
        this.idInput.nativeElement.value = ""
      }
    });
  }

  resetSearch() {
    this.range.reset({
      start: null,
      end: null,
    });
    this.idInput.nativeElement.value = ""
    
    this.searchFlag = false;
    this.goToPage()
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'], // Add this line
    });
  }

  get isConnectionDtlsAvailable(): boolean {
    return !!this.connectionDtls && this.connectionDtls.length > 0;
  }

}
