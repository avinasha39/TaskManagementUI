import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  AddForm = this.formBuilder.group({
    title : '',
    description : '',
    duration : '',
  });

  projects: any;

  constructor(private dataProvider: SharedService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.dataProvider.getProjectList().subscribe(projectsResp => this.projects = projectsResp);
  }

  open(content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmitAdd(){
    console.log(this.AddForm.value);
    this.dataProvider.addProject(this.AddForm.value).subscribe(res => console.log(res));
    this.getProjects();
    this.modalService.dismissAll();
    this.AddForm.reset();
  }

}
