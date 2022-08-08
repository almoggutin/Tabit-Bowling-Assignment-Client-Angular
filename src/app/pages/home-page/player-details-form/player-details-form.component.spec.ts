import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailsFormComponent } from './player-details-form.component';

describe('PlayerDetailsFormComponent', () => {
  let component: PlayerDetailsFormComponent;
  let fixture: ComponentFixture<PlayerDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
