import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceDialogComponent } from './new-service-dialog.component';

describe('NewServiceDialogComponent', () => {
  let component: NewServiceDialogComponent;
  let fixture: ComponentFixture<NewServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewServiceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
