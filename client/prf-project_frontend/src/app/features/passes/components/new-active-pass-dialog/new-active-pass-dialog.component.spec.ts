import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActivePassDialogComponent } from './new-active-pass-dialog.component';

describe('NewActivePassDialogComponent', () => {
  let component: NewActivePassDialogComponent;
  let fixture: ComponentFixture<NewActivePassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewActivePassDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewActivePassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
