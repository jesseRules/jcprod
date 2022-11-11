import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtubeExampleComponent } from './ytube-example.component';

describe('YtubeExampleComponent', () => {
  let component: YtubeExampleComponent;
  let fixture: ComponentFixture<YtubeExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtubeExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YtubeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
