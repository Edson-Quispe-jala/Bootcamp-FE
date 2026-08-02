import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCard } from './specific-card';

describe('SpecificCard', () => {
  let component: SpecificCard;
  let fixture: ComponentFixture<SpecificCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecificCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
