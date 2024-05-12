import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncomeDialogComponent } from './new-income-dialog.component';

describe('NewIncomeDialogComponent', () => {
  let component: NewIncomeDialogComponent;
  let fixture: ComponentFixture<NewIncomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewIncomeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewIncomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
