import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerControllsComponent } from './player-controlls.component';

describe('PlayerControllsComponent', () => {
  let component: PlayerControllsComponent;
  let fixture: ComponentFixture<PlayerControllsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerControllsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerControllsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
