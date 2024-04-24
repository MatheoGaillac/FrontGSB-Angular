import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterInvitationComponent } from './ajouter-invitation.component';

describe('AjouterInvitationComponent', () => {
  let component: AjouterInvitationComponent;
  let fixture: ComponentFixture<AjouterInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterInvitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
