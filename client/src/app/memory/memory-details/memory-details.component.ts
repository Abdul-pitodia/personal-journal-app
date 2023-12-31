import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Memory } from '../../models/Memory';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-memory-details',
  templateUrl: './memory-details.component.html',
  styleUrl: './memory-details.component.css',
})
export class MemoryDetailsComponent {
  @Input()
  selectedMemory!: Memory | null;

  @Output() editMemoryEvent= new EventEmitter<boolean>();
  @Output() removeMemoryEvent = new EventEmitter<Memory>();

  constructor(private backendService: BackendService) {}

  public editMemory(){
    this.editMemoryEvent.emit(true);
  }

  public removeMemory(){
    if (this.selectedMemory) {
      this.removeMemoryEvent.emit(this.selectedMemory);
      this.selectedMemory = null;
    }
  }

}
