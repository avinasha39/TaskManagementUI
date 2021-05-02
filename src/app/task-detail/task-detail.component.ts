import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { SharedService } from '../shared.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})


export class TaskDetailComponent implements OnInit {


  public isCollapsed = true;
  tid: any ;
  pid: any;
  task: any;

  EditForm = this.formBuilder.group({
    'title':'',
    'description':'',
    'startDate':'',
    'endDate':''
});

  constructor(private route: ActivatedRoute, private dataProvider: SharedService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
    this.tid = params.get('tid');
    this.pid = params.get('pid');
    this.getTasks();
  })
  }
  
  getTasks() {
    this.dataProvider.getTaskDetails(this.pid, this.tid).subscribe(res=> this.task =res);
  }

  onEditForm(){
    this.EditForm.value.startDate = this.EditForm.value.startDate.year+'-'+this.EditForm.value.startDate.month+'-'+this.EditForm.value.startDate.day;
    this.EditForm.value.endDate = this.EditForm.value.endDate.year+'-'+this.EditForm.value.endDate.month+'-'+this.EditForm.value.endDate.day;
    this.EditForm.value['project'] = this.pid;
    this.dataProvider.UploadTaskDetails(this.pid,this.tid,this.EditForm.value).subscribe(res => {console.log(res);this.getTasks();});
    console.warn('Your order has been submitted', this.EditForm.value);    
    this.isCollapsed = !this.isCollapsed;
  }

  onDelete(){
    this.dataProvider.deleteTaskWithId(this.pid,this.tid).subscribe(res=>{console.log(res);this.router.navigate(["/projects/"+this.pid]);});
    
  }
}

