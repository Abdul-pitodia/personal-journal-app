import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Memory } from '../../models/Memory';


@Component({
  selector: 'app-memory-item',
  templateUrl: './memory-item.component.html',
  styleUrl: './memory-item.component.css'
})
export class MemoryItemComponent {

  @Input()
  data!: Memory;

  @Output() selectMemoryEvent= new EventEmitter<Memory>();

  emitMemory(){
    this.selectMemoryEvent.emit(this.data);
  }
}
