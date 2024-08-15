import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSeriesComponent } from './top-series.component';

describe('TopSeriesComponent', () => {
  let component: TopSeriesComponent;
  let fixture: ComponentFixture<TopSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSeriesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
