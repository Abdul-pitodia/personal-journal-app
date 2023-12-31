import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Tag } from '../../models/Tag';
import { formatDate } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { Memory } from '../../models/Memory';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-memory',
  templateUrl: './create-memory.component.html',
  styleUrl: './create-memory.component.css',
})
export class CreateMemoryComponent implements OnInit {
  public savedTags: Tag[] = [];

  @Input() formRef!: FormGroup;
  @Input() formAction!: string;
  hideForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private sharedService: SharedService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.backendService.getAvailableTags().subscribe((data) => {
      this.savedTags = data.data;
    });
    this.hideForm = false;
  }

  isChecked(tag: Tag): boolean{

    return ((this.formRef.get('tags') as FormArray).value as Tag[]).findIndex((x) => x.id === tag.id) < 0 ? false : true;
  }

  addTag(event: any, tag: Tag) {
    const tags = this.formRef.get('tags') as FormArray;
    
    if (event.target.checked) {
      tags?.push(this.fb.control(tag, Validators.required));
    } else {
      const index = tags.controls.findIndex((x) => x.value === tag);
      tags.removeAt(index);
    }

  }

  clearTags() {
    const tags = this.formRef.get('tags') as FormArray;
    tags.clear();
  }

  onSubmit() {
    if (this.formRef.valid) {

      // Process the form data here

      if (this.formAction === "create") this.sharedService.addMemory(this.formRef.value);
      else if (this.formAction === "update") {
        this.sharedService.updateMemory(this.formRef.value);
        this.formAction = "create";
      }

      this.formRef.reset();
      this.clearTags();
      this.hideForm = true;
    }
  }
}
