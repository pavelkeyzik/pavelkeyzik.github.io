import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeControllComponent } from './volume-controll.component';

describe('VolumeControllComponent', () => {
  let component: VolumeControllComponent;
  let fixture: ComponentFixture<VolumeControllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeControllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
