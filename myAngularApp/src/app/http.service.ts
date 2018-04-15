import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import any = jasmine.any;


@Injectable()
export class HttpService {

  //edit constructor(private _http: HttpClient)
  constructor(private _http: HttpClient) {

    // this.getTasks();
    // no longer want the service itself to be invoking the getTasks() function...we want the COMPONENT to do that

    // this.getTaskById(task_id);
  }

  getTasks(){
    //our http response is an observable, // store it in the variable tempObservable

    //the server should return the JSON
    // let tempObservable = this._http.get('/tasks');

    //the server should return the JSON
    return this._http.get('/tasks');

    //subscribe to our observable and provide the code
    // we would like to do with our data from the response
    //remove the subscription from the service, and put the subscription in the COMPONENT! (commented out line below)
    // tempObservable.subscribe(data => console.log("Subscription just delivered new data (tasks)!", data));
  }




  getTaskById(task_id){
    //sample _id: "5ace53db9e53309f623dfb04"
    let tempObservable = this._http.get(`/tasks/${task_id}`);

    tempObservable.subscribe(data => console.log(`Subscription delivered data (individual task)`,data));

  }

  addTask(newtask){
    // return this._http.post('/tasks', newtask);
    let url = `/tasks`;
    // this._http.post(url, {moo:"foo",goo:"loo"})
    return this._http.post(url, newtask);

  }

  createTask(new_task_data){
    console.log(`placeholder for sending new save request to server`,);
    //New
    console.log(`Data for new tasK:`,new_task_data);
    let url = `/tasks`;
    // this._http.post(url, {moo:"foo",goo:"loo"})
    this._http.post(url, new_task_data)
      .subscribe(res => console.log(res));

    //save request
  }



  updateTask(task_id, updated_task_info){
    console.log(`placeholder for sending new PUT request to server`,);
    //= {'title':'phil','description':'phil tasks','completed':true}
    console.log(`Updated info for task recieved...attempting to update`,updated_task_info);
    console.log(`Data for new tasK:`,updated_task_info);
    let url = `/tasks/${task_id}`;
    this._http.put(url, updated_task_info)
      .subscribe(res => console.log(res));

  }

  deleteTask(task_id) {
    console.log(`attempting to send DELETE request to server`,);
    let url = `/tasks/${task_id}`;
    this._http.delete(url)
      .subscribe(res => console.log(res));

    //delete request
  }



}
