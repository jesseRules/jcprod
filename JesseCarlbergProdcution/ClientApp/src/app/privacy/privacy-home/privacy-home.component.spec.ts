import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyHomeComponent } from './privacy-home.component';

describe('PrivacyHomeComponent', () => {
  let component: PrivacyHomeComponent;
  let fixture: ComponentFixture<PrivacyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
