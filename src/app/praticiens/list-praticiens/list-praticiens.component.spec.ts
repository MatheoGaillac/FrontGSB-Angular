import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPraticiensComponent } from './list-praticiens.component';

describe('ListPraticiensComponent', () => {
  let component: ListPraticiensComponent;
  let fixture: ComponentFixture<ListPraticiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPraticiensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPraticiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
