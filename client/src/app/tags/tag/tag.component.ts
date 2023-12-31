import { Component, OnInit } from '@angular/core';
import { Tag } from '../../models/Tag';
import { BackendService } from '../../services/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent implements OnInit{

  public savedTags: Tag[] = [];
  tagForm!: FormGroup;

  constructor(
    private backendService: BackendService,
    private fb: FormBuilder,
  ) {}
  

  ngOnInit(): void {
    this.backendService.getAvailableTags().subscribe((data) => {
      this.savedTags = data.data;
    });

    this.tagForm = this.fb.group({
      tagName: ['', Validators.required]
    })
  }

  createTag() {
    
    this.backendService.createTag(this.tagForm.value.tagName).subscribe((data) => {
      this.savedTags = [...this.savedTags, data.data];
    })
  }

  deleteTag(tag:Tag){
    
    this.backendService.deleteTag(tag).subscribe((data) => {
      let idx = this.savedTags.findIndex((x) =>x.id ===tag.id);
      this.savedTags.splice(idx, 1);
      
    })
  }

}
