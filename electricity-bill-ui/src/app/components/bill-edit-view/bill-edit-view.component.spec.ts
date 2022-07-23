import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillEditViewComponent } from './bill-edit-view.component';

describe('BillEditViewComponent', () => {
  let component: BillEditViewComponent;
  let fixture: ComponentFixture<BillEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
