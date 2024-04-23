import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierInvitationComponent } from './modifier-invitation.component';

describe('ModifierInvitationComponent', () => {
  let component: ModifierInvitationComponent;
  let fixture: ComponentFixture<ModifierInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierInvitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
