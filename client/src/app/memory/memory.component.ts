import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Memory } from '../models/Memory';
import { BackendService } from '../services/backend.service';
import { SharedService } from '../services/shared.service';
import { formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from '../models/Tag';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css',
})
export class MemoryComponent {
  memories: Memory[] = [];

  selectedMemory!: Memory | null;
  createButtonClicked: boolean = false;
  myForm!: FormGroup;
  formAction!: string;

  constructor(
    private service: BackendService,
    private sharedService: SharedService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.service.getMemories().subscribe((data) => {
      this.memories = data.data;
    });

    this.sharedService.newMemory.subscribe((data) => {
      this.memories = [...this.memories, data];
    });

    this.sharedService.editMemory.subscribe((data) => {

      let index = this.memories.findIndex(el => el.id === data.id)
      this.memories.splice(index, 1);
      this.memories = [...this.memories, data];
    })
  }

  buildForm(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      date: [formatDate(new Date(), 'yyyy/MM/dd', 'en')],
      tags: this.fb.array([]),
      media: ['', Validators.required],
    });
  }

  updateForm(): void {

    this.myForm.addControl('id', this.fb.control(''));

    this.myForm.patchValue({
      title: this.selectedMemory?.title,
      content: this.selectedMemory?.content,
      date: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      media: this.selectedMemory?.media,
      id: this.selectedMemory?.id,
    });

    const tagsArray = this.myForm.get('tags') as FormArray;
    tagsArray.clear();

    this.selectedMemory?.tags.forEach((tag: Tag) => {
      tagsArray.push(this.fb.control(tag));
    });
  }

  receiveSelectedMemory($event: Memory) {
    this.createButtonClicked = false;
    this.selectedMemory = $event;
  }

  createMemory() {
    this.buildForm();
    this.formAction = "create"
    this.createButtonClicked = true;
  }

  updateMemory() {
    this.buildForm();
    this.updateForm();
    this.formAction = "update";
    this.createButtonClicked = true;
  }

  deleteMemory(event: Memory) {
    this.service.deleteMemory("", event.id).subscribe((data) => {
      this.createButtonClicked = false;
      let index = this.memories.findIndex(el => el.id === event.id)
      this.memories.splice(index, 1);
      this.memories = [...this.memories];
    })
  }
}
