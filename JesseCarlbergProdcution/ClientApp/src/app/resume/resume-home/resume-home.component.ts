import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-home',
  templateUrl: './resume-home.component.html',
  styleUrls: ['./resume-home.component.css']
})
export class ResumeHomeComponent implements OnInit {
  public showSide = true;
  constructor() { }

  ngOnInit(): void {
  }

}
