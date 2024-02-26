import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ConnectionService } from './../../shared/services/connection-service/connection.service';
import { ConnYearStatus } from './../../shared/models/connYearStatus';
import { ConnStatus } from 'src/app/shared/models/connStatus';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visual-dashboard',
  templateUrl: './visual-dashboard.component.html',
  styleUrls: ['./visual-dashboard.component.css']
})
export class VisualDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  searchYear: any = 2024;
  yearData!: ConnYearStatus[];
  private searchSubject: Subject<string> = new Subject<string>();
  constructor(private connService: ConnectionService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.handleSearch()
  }

  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {},
      y: {
        suggestedMin: 0,  // Adjust based on your data range
        suggestedMax: 10, // Adjust based on your data range
        // stepSize: 1,      // Adjust based on your data range and preference
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      { data: [], label: 'Connection Requests' },
      { data: [], label: 'Pending' },
      { data: [], label: 'Approved' },
    ],
  };

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void { }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void { }



  public onOptionsSelected(event: any) {
    const value = event.target.value;
    // console.log(value);
  }

  handleSearch() {

    this.barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        { data: [], label: 'Connection Requests' },
        { data: [], label: 'Pending' },
        { data: [], label: 'Approved' },
      ],
    };
    

    // console.log(this.searchYear);

    

    if(this.searchYear == ""){
      this.openSnackBar("Please enter a year to visualize the data.")
      return;
    }
    if(this.searchYear.length < 4){
      return
    }
    this.connService.fetchConnectionByYear(this.searchYear).subscribe(
      (data) => {
        this.yearData = data;
        // console.log(this.yearData)
        this.handleView(this.yearData)
      },
      (error)=>{
        if(error.error.errorMessage != null){
          this.openSnackBar(error.error.errorMessage )
        }else{
          this.openSnackBar("Something went wrong, Please try again later.")
        }
      }
    );
  }

  handleView(data:ConnYearStatus[]){
    
    let data1:number[] = []
    let data2:number[] = []
    let data3:number[] = []
    for(let i =0; i<data.length; i++){
      data1.push(data[i].total)
      data2.push(data[i].pending)
      data3.push(data[i].approved)
    }

    this.barChartData.datasets[0].data = data1;

    this.barChartData.datasets[1].data = data2;

    this.barChartData.datasets[2].data = data3;



    this.chart?.update();
  }


  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'], // Add this line
    });
  }
  

}
