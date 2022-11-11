import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingHomeComponent } from './consulting-home.component';

describe('ConsultingHomeComponent', () => {
  let component: ConsultingHomeComponent;
  let fixture: ComponentFixture<ConsultingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultingHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
