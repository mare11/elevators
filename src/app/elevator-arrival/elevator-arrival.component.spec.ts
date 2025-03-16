import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorArrivalComponent } from './elevator-arrival.component';

describe('ElevatorArrivalComponent', () => {
  let component: ElevatorArrivalComponent;
  let fixture: ComponentFixture<ElevatorArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevatorArrivalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevatorArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
