// import { Component } from '@angular/core';
import { HttpService } from "./http.service";
import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//added the implements OnInit to the class declaration
export class AppComponent implements OnInit{
  title = 'MEAN haus';
  subtitle = '...mind the gap';
  first_task = '5ace53db9e53309f623dfb04';
  user_form_name = "kermit";
  newTask: any;
  //newTask will be bound to the input fields on the HTML
  // newTask = {
  //   title: "",
  //   description: "",
  // };

  //TODO: make a create method that is invoked when someone clicks on the submit button
  create(){
    //make the new task
    //communicate with the service
    //tell the service what our new task is
    //have the service make the post request to the server
    //TODO: empty out the form after submit
  }




  onButtonClick(): void {
    console.log(`Click event is working`);
  }
  onButtonClickParam(num: Number): void {
    console.log(`Click event is working with num param: ${num}`);
  }
  onButtonClickParams(num: Number, str: String): void {
    console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  }
  onButtonClickEvent(event: any): void {
    console.log(`Click event is working with event: `, event);
  }
  //in order to store things in this class, created a tasks variable
  tasks = [];

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.newTask = { title: "", description: ""}

    // this.getTasksFromService();
    // this.specificTask;
  }


  helloButton(){
    alert('Hello button!');
  }

  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log(`Got the data (tasks): `, data);
      this.tasks = data['tasks'];
    })
  }
  getTaskById = (task_id) => {
    console.log(`req for task: `,task_id);
    this._httpService.getTaskById(task_id)
  };


  deleteTask = (task_id) => {this._httpService.deleteTask(task_id)};
  createTask = (new_task_object) => {this._httpService.createTask(new_task_object)};
  updateTask = (task_id, updated_task_object) => {this._httpService.updateTask(task_id, updated_task_object)};


  onSubmit(){
    //  code to send off form data (this.newTask) to Service
    // console.log(`title: ${this.newTask.title} | description: ${this.newTask.description}`,);
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log(`attempted task submission. result: `, data);
      //reset newTask
      this.newTask = {title: "", description: ""}
    });

  }

  // getTasks = () => {this._httpService.getTasks()};
  // getAllTasks(){
  //   let observable = this._httpService.getTasks();
  //   observable.subscribe(data => {
  //     this.tasks = data['tasks'];
  //   })
  // }

  // console.log("tasks:", tasks);

  //have an input
  //have a form or event


  // title = 'MEAN Stack!';
  //  inject the service we created



  //Ashley's version:
  // this.getTaskFromService(task_id) {
  //   let observable = this._httpService.getTasks();
  //   observable.subscribe(data => {
  //     console.log("Got our tasks!");
  //     this.specificTask = data['data'][task_id];
  //   });
  // }

  //the main http endpoint (might not need this...do I?)
  // readonly ROOT_URL = 'mongodb://localhost/restful_tasks';

  // tasks: any;

  //non-static-typed
  // getTasks() {
  //   this.tasks = this._httpService.get<Task>(this.ROOT_URL + '/tasks');
  //   //should return an observable from the api
  // }
  // constructor(private http: HttpClient) {}

}
