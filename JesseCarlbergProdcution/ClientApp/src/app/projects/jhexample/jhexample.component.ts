import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { finalize, Subscription } from 'rxjs';
import { JhExampleService } from './services/jhexample.service';
import { BaseChartDirective } from 'ng2-charts';

export interface Fips {
  fip: string,
  county: string,
  state: string,
}
export interface StateModel {
  name: string,
  abbreviation: string,
  fips: string,
}


@Component({
  selector: 'app-jhexample',
  templateUrl: './jhexample.component.html',
  styleUrls: ['./jhexample.component.css']
})
export class JHExampleComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChart: any;
  public errors: any;
  public loading: boolean = false;
  public seed = 5;
  public fipsBase: Fips[] = [];
  public fips: Fips[] = [];
  public chartData: any;
  public states: StateModel[] = [];
  public cnt = 90;

  constructor(private jhExampleService: JhExampleService) { }

  ngOnInit(): void {
    this.createChart();
    this.getFips();
    this.getStates();
  }

  getStates(): void {
    this.jhExampleService.getStates().subscribe(
      (data: StateModel[]) => {
        this.states = data;
      },

      (error) => {
        this.errors = error;
      },
      () => {

      }
    );
  }

  getFips(): void {
    this.fipsBase = this.fips;
  }

  getChartCountyData(county: string, count: number): void {
    this.loading = true;
    this.jhExampleService.getChartInfoCounty(county, count).subscribe(
      (data) => {
        this.chartData = data;
        this.barChart.data = data;
        this.barChart.update();
      },

      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {
        this.barChart.update();
        this.loading = false;
      }
    );
  }

  getChartStateData(state: string, count: number): void {
    this.loading = true;
    this.jhExampleService.getChartInfoState(state, count).subscribe(
      (data) => {
        this.chartData = data;
        this.barChart.data = data;
        this.barChart.update();
      },

      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {
        this.barChart.update();
        this.loading = false;
      }
    );
  }

  ngAfterViewInit(): void { }

  reloadData(): void {
    this.barChart.update();
  }

  selchange(event: any) {
    this.getChartStateData(event.value.fips, this.cnt);
    this.fips = this.fipsBase.filter(
      (s: Fips) => s.state == event.value.abbreviation
    );
  }

  selCountyChange(event: any) {
    this.getChartCountyData(event.value.fip, this.cnt);
  }

  createChart(): void {
    var options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
              color: 'rgba(255,99,132,0.2)',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    this.barChart = new Chart('jhcanvas', {
      type: 'bar',
      data: this.chartData
    });
  }
}
