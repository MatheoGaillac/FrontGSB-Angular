import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPraticiensCriteresComponent } from './list-praticiens-criteres.component';

describe('ListPraticiensCriteresComponent', () => {
  let component: ListPraticiensCriteresComponent;
  let fixture: ComponentFixture<ListPraticiensCriteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPraticiensCriteresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPraticiensCriteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
