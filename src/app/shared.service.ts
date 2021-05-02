import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "https://task-management-demo.herokuapp.com/api/";
  readonly PhotoUrl = "https://task-management-demo.herokuapp.com/media/";

  constructor(private http:HttpClient) { }

  getProjectList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'projects');
  }

  addProject(val:any){
    return this.http.post(this.APIUrl + 'projects',val);
  }  

  deleteAllProjects(){
    return this.http.delete(this.APIUrl + 'projects/');
  }

  getProjectDetails(val:any){
    return this.http.get<any>(this.APIUrl+'project/'+val);
  }

  updateProjectDetails(val:any,data :any){
    return this.http.patch<any>(this.APIUrl+'project/'+val,data);
  }

  deleteProjectWithId(val:any){
    return this.http.delete<any>(this.APIUrl+'project/'+val);
  }

  getTaskList(projId:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'projects/'+projId+'/tasks');
  }

  addTask(projId:any,taskdata : any ){
    return this.http.post(this.APIUrl + 'projects/'+projId+'/tasks',taskdata);
  }

  deleteAllTasks(projId:any){
    return this.http.delete(this.APIUrl + 'projects/'+projId+'/tasks');
  }

  getTaskDetails(projId:any, taskId : any){
    return this.http.get(this.APIUrl + 'projects/'+projId+'/tasks/'+taskId);
  }

  UploadTaskDetails(projId:any, taskId : any,taskdata : any){
    return this.http.patch<any>(this.APIUrl + 'projects/'+projId+'/tasks/'+taskId, taskdata);
  }

  deleteTaskWithId(projId:any, taskId : any){
    return this.http.delete(this.APIUrl + 'projects/'+projId+'/tasks/'+taskId);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'project/SaveFile/',val);
  }
}