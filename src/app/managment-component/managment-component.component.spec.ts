import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentComponentComponent } from './managment-component.component';

describe('ManagmentComponentComponent', () => {
  let component: ManagmentComponentComponent;
  let fixture: ComponentFixture<ManagmentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagmentComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagmentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
