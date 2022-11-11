import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeHomeComponent } from './resume-home.component';

describe('ResumeHomeComponent', () => {
  let component: ResumeHomeComponent;
  let fixture: ComponentFixture<ResumeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
