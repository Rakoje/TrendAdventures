import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MneComponent } from './mne.component';

describe('MneComponent', () => {
  let component: MneComponent;
  let fixture: ComponentFixture<MneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
