import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichePraticienComponent } from './affiche-praticien.component';

describe('AffichePraticienComponent', () => {
  let component: AffichePraticienComponent;
  let fixture: ComponentFixture<AffichePraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichePraticienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichePraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
