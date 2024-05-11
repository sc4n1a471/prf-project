import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassDialogComponent } from './new-pass-dialog.component';

describe('NewPassDialogComponent', () => {
  let component: NewPassDialogComponent;
  let fixture: ComponentFixture<NewPassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPassDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
