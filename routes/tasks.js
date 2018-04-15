var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var task = mongoose.model('Task');
mongoose.Promise = global.Promise;

var Task = mongoose.model('Task');


//retrieve all tasks
router.get('/tasks', function (req, res) {
    console.log(`arrived at the all tasks page`,);
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log(`there was an error`,);
            res.redirect('/');
        } else {
            console.log(`showing the tasks`, tasks);
        }
        res.json({message:"success", tasks:tasks, errors: tasks.errors});

        // res.render('tasks', {tasks:tasks, errors :tasks.errors});
    });
});


//display info on ONE task
router.get('/tasks/:id', function (req, res) {
    console.log(`recieved request for task: `, req.params.id);
    var taskPromise = new Promise(function(resolve, reject) {
        console.log(`making promise`,);
        resolve(Task.find({_id: req.params.id}));
    });
    taskPromise.then(function(task) {
        console.log("It worked!", task);
        // res.render('single_task', {task: task[0]});
        res.json({message:"got the task", task:task, errors: task.errors})
    }).catch(function(err) {
        // Instead, this happens:
        console.log("It failed!", err);
        // res.render('edit_task_form', {errors:errors});
        res.json({message: "failed.", errors: err.message});
    });
});

//form to EDIT an existing task
router.get('/tasks/edit/:id', function (req, res) {
    console.log(`recieved request to edit task: `, req.params.id);
    //grab id and see if that task exists

    var taskPromise = new Promise(function(resolve, reject) {
        console.log(`making promise`,);
        // JSON.parse throws an error if you feed it some
        resolve(Task.find({_id: req.params.id}));
        // invalid JSON, so this implicitly rejects:
        // resolve(JSON.parse("This ain't JSON"));
    });

    taskPromise.then(function(task) {
        // This never happens:
        console.log("It worked!", task);
        res.render('edit_task_form', {task: task[0]});
    }).catch(function(err) {
        // Instead, this happens:
        console.log("It failed!", err);
        res.json({message:"Failed.", errors: task.errors});
        // res.render('edit_task_form', {errors:errors});

    })
});


//route to CREATE a task
router.post('/tasks', function (req, res) {
    //new task data recieved
    console.log(`request.headers.title: `,req.body.title);
    console.log(`request.description: `,req.body.description);

    var taskPromise = new Promise(function(resolve, reject) {
        console.log(`making promise`,);
        console.log(`request.body: `,req.body);

        var task = new Task(req.body);
        console.log(`data received:`,task);
        resolve(task.save());
    });
    taskPromise.then(function(task) {
        console.log("It worked!", task);
        // res.redirect('/');
        res.json({message: "Successfully saved the new task"});
    }).catch(function(err) {
        console.log("It failed!", err);
        res.json({message: "error saving task", errors: task.errors});
        // res.render('task_form', {task: task, errors: task.errors});
    })
});



//POST the info to UPDATE an existing task ('tasks/edit/:id')
router.put('/tasks/:id', function (req, res) {
    console.log(`recieved UPDATE for task: `, req.params);
    // res.json({message: "working on it"})

    var taskPromise = new Promise(function(resolve, reject) {
        console.log(`finding if update task exists`,);
        resolve(Task.find({_id: req.params.id}));
    });
    taskPromise.then(function(task) {
        console.log("task exists", task);
        //now start new promise to update the existing task
        // res.json({message:"working on it", task: task})

        var updatePromise = new Promise(function (resolve, reject) {
            console.log(`trying to update the task,`);
            resolve(Task.update({_id: req.params.id},
                {
                    title: req.body.title,
                    description: req.body.description,
                    completed: req.body.completed,
                }));
        });
        updatePromise.then(function (task) {
            console.log(`task updated successfully!`,);
            res.json({message: "task updated successfully", task: task});

        }).catch(function (err) {
            console.log(`problems!!!`, err);
            //     res.json({message: "problems with update", errors: task.errors});
        });
    }).catch(function(err) {
        // Instead, this happens:
        console.log("It failed!", err);
        res.json({message: "update failed", errors: task.errors});
    });
});


// DELETE request
router.delete('/tasks/:id', function (req, res) {
    console.log(`recieved request to delete task`,);
    var taskPromise = new Promise(function(resolve, reject) {
        console.log(`trying to delete task`,);
        resolve(Task.remove({_id: req.params.id}));
    });
    taskPromise.then(function(task) {
        // This never happens:
        console.log("task gone!", task);
        res.json({message: "Successfully deleted the task"});
    }).catch(function(err) {
        // Instead, this happens:
        res.json({message:"error deleting task", errors: task.errors});
    })
});



//create one task on load
var createSampleTask = function () {
    console.log(`trying to save an task`,);
    var taskInstance = new Task();
    taskInstance.title = 'Do task';
    taskInstance.description = 'this was a thing to do do do do do';

    taskInstance.save(function (err) {
        if (err) {
            // console.log(`there was an error saving to db`, err);
            console.log(`there was an error saving to db`, );
        } else {
            console.log(`successfully saved!`);
        }
    });
};
// createSampletask();


module.exports = router;
