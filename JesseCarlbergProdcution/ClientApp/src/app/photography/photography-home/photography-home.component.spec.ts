import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyHomeComponent } from './photography-home.component';

describe('PhotographyHomeComponent', () => {
  let component: PhotographyHomeComponent;
  let fixture: ComponentFixture<PhotographyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotographyHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
