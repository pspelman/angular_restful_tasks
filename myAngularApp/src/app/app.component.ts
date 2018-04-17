// import { Component } from '@angular/core';
import { HttpService } from "./http.service";
import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// interface Task{
//   title: String;
//   description: String;
//   completed: Boolean;
// }

//added the implements OnInit to the class declaration
export class AppComponent implements OnInit {

  task: any;
  title = 'MEAN haus';
  subtitle = '...mind the gap';
  first_task = '5ace53db9e53309f623dfb04';
  user_form_name = "kermit";
  newTask: any;
  getTask: any;
  selected_task: any;
  //maybe need to assign update_task to the selected_task when it gets selected so I don't overwrite anything?

  update_task: any;

  //in order to store things in this class, created a tasks variable
  tasks = [];
  
  //newTask will be bound to the input fields on the HTML
  // newTask = {
  //   title: "",
  //   description: "",
  // };

  //TODO: make a create method that is invoked when someone clicks on the submit button
  create() {
    //make the new task
    //communicate with the service
    //tell the service what our new task is
    //have the service make the post request to the server
    //TODO: empty out the form after submit
  }

  toggle_completed_status(): void {
    console.log(`Entered toggle...Current completed status:`, this.selected_task.completed);
    // this.selected_task.complete = this.selected_task.complete;
    //
    // if (this.selected_task.complete === 'false') {
    //   this.selected_task.completed = 'true';
    // } else {
    //   this.selected_task.completed = 'false';
    // }

    (this.selected_task.completed == false) ? this.selected_task.completed = true : this.selected_task.completed = false;
    console.log(`toggled selected task completion status: `, this.selected_task.completed);
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


  constructor(private _httpService: HttpService) {

  }

  ngOnInit() {
    this.newTask = {title: "", description: ""};
    this.getTask = {id: ""};
    this.selected_task = {title: "", description: ""};
    // this.task_to_update = { title: "", description: "" };


    // this.getTasksFromService();
    // this.specificTask;
  }

  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log(`Got the data (tasks): `, data);
      this.tasks = data['tasks'];
    })
  }


  //Ashley's version:
  // this.getTaskFromService(task_id) {
  //   let observable = this._httpService.getTasks();
  //   observable.subscribe(data => {
  //     console.log("Got our tasks!");
  //     this.specificTask = data['data'][task_id];
  //   });
  // }


  getTaskById = (task_id) => {
    console.log(`req for task: `, task_id);

    let observable = this._httpService.getTaskById(task_id);
    observable.subscribe(data => {
      console.log(`getTaskById || server returned:`, data);
      // if (data.errors){
      //   console.log(`there were errors: `,data.errors);
      //   alert('no such task was found. Please try again');
      // } else {
      let temp = data;
      this.selected_task = temp.task[0];
      console.log(`selected task.task: `, this.selected_task);
    });
  };

  onSubmit(){
    //  code to send off form data (this.newTask) to Service
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log(`attempted task submission. result: `, data);
      //reset newTask
      this.reset_selected_task();
      this.getTasksFromService();

      // this.newTask = {title: "", description: ""}
    });
  }

  // COMPONENTS FILE
  //THIS IS OPTION A
  // deleteTask = (task_id) => {this._httpService.deleteTask(task_id)};

  //TODO: THIS IS OPTION B
  deleteTask(task_id){
    let observable = this._httpService.deleteTask(task_id);
    observable.subscribe(data => {
      //the data that is returned should be the message from the server saying success or fail
      console.log(`attempted to delete task. Server returned: `,data );
      this.reset_selected_task();
      this.getTasksFromService();
    });
  }

  // createTask = (new_task_object) => {this._httpService.createTask(new_task_object)};
  // updateTask = (task_id, updated_task_object) => {this._httpService.updateTask(task_id, updated_task_object)};

  reset_selected_task(){
    console.log(`resetting selected_task`,);
    this.selected_task = { title: "", description: "", completed: "" };

  }

  updateTask() {
    console.log(`reached COMPONENT update task...working on it`,);
    //two-way binding means that the data to be sent off are already in the selected_task variable

    let observable = this._httpService.updateTask(this.selected_task);

    observable.subscribe(data => {
      if (data.errors) {
        console.log(`there were Error updating task: `, data.errors);
        alert("could not update. Error" + data.errors);
      } else {
        let temp = data;
        this.selected_task = temp.task[0];
        console.log(`selected task.task: `, this.selected_task);
        this.reset_selected_task();
        this.getTasksFromService();
      }
      console.log(``,);
    });
  }
};





  //the main http endpoint (might not need this...do I?)
  // readonly ROOT_URL = 'mongodb://localhost/restful_tasks';

  // tasks: any;

  //non-static-typed
  // getTasks() {
  //   this.tasks = this._httpService.get<Task>(this.ROOT_URL + '/tasks');
  //   //should return an observable from the api
  // }
  // constructor(private http: HttpClient) {}

