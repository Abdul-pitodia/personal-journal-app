import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Subject } from 'rxjs';
import { Memory } from '../models/Memory';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private newMemory$ = new Subject<Memory>();
  private updateMemory$ = new Subject<Memory>();
  private deleteMemory$ = new Subject<Memory>();

  public newMemory = this.newMemory$.asObservable();
  public editMemory = this.updateMemory$.asObservable();
  public removeMemory = this.deleteMemory$.asObservable();

  constructor(private backendService: BackendService) {}

  public addMemory(memory: Memory) {
    this.backendService.createMemory(memory).subscribe((data) => {
      this.newMemory$.next(data.data);
    });
  }

  public updateMemory(memory: Memory) {
    this.backendService.updateMemory(memory).subscribe((data) => {
      this.updateMemory$.next(data.data);
    });
  }

  public deleteMemory(memory: Memory) {
    this.backendService.deleteMemory("xyz", memory.id).subscribe((data) => {
      this.deleteMemory$.next(memory);
    })
  }
}
