import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { SharedService } from '../shared.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  public isCollapsed = true;
  public isCollapsedAdd = true;
  public isProjectLoaded = false;
  public isTaskListLoaded = false;
  id: any ;
  tasks: any;
  project: any;
  
  checkoutForm = this.formBuilder.group({
    title : '',
    description : '',
    duration : '',
  });

  AddForm = this.formBuilder.group({
      'title':'',
      'description':'',
      'startDate':'',
      'endDate':'',
  });
  constructor(private route: ActivatedRoute, private dataProvider: SharedService, private formBuilder: FormBuilder, private router: Router) {
     this.isCollapsed = true;
     this.isCollapsedAdd = true;
  }

  ngOnInit(): void { 
    this.route.paramMap.subscribe((params: ParamMap) => {
    this.id = params.get('id');
    this.getProject(this.id);
    this.getProjectTasks(this.id);
  })
  }

  OnFormAdd(): void {

    this.AddForm.value.startDate = this.AddForm.value.startDate.year+'-'+this.AddForm.value.startDate.month+'-'+this.AddForm.value.startDate.day;
    this.AddForm.value.endDate = this.AddForm.value.endDate.year+'-'+this.AddForm.value.endDate.month+'-'+this.AddForm.value.endDate.day;

    this.dataProvider.addTask(this.id,this.AddForm.value).subscribe(res => {
      console.log(res); 
      this.getProjectTasks(this.id);
      this.isCollapsedAdd = !this.isCollapsedAdd;
      this.AddForm.reset();
    });      
  }

  onProjectEdit(): void {
    this.dataProvider.updateProjectDetails(this.id,this.checkoutForm.value).subscribe(res => 
      {
        console.log(res);
        this.getProject(this.id);
        this.isCollapsed = !this.isCollapsed;
        this.checkoutForm.reset();
      });    
  }

  onDelete(): void {
    this.dataProvider.deleteProjectWithId(this.id).subscribe(projResp => {console.log(projResp) ;this.router.navigate(["/"]);});    
  }

  getProjectTasks(id: number): void {
    this.dataProvider.getTaskList(id).subscribe(tasksResp => this.tasks = tasksResp);
    this.isTaskListLoaded = true;
  }

  getProject(id: number): void {
    this.dataProvider.getProjectDetails(id).subscribe(projectResp => this.project = projectResp);
    this.isProjectLoaded = true;
  }
}