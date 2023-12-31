import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryItemComponent } from './memory-item.component';

describe('MemoryItemComponent', () => {
  let component: MemoryItemComponent;
  let fixture: ComponentFixture<MemoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
