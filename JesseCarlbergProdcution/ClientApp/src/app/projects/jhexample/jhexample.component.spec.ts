import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JHExampleComponent } from './jhexample.component';

describe('JHExampleComponent', () => {
  let component: JHExampleComponent;
  let fixture: ComponentFixture<JHExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JHExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JHExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
