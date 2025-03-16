import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorRequestComponent } from './elevator-request.component';

describe('ElevatorRequestComponent', () => {
  let component: ElevatorRequestComponent;
  let fixture: ComponentFixture<ElevatorRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevatorRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevatorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
