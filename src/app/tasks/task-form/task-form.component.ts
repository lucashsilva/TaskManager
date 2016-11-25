import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Task } from '../task/task.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Output() toggleTaskForm;
  @Output() taskSubmitted;
  @Input() task: Task;
  @Input() editForm = false;

  constructor(private tasksService: TasksService) {
    this.toggleTaskForm = new EventEmitter();
    this.taskSubmitted = new EventEmitter();
    this.task = new Task();
  }

  ngOnInit() {
  }

  toggleAddTask(): void {
    this.toggleTaskForm.emit();
  }

  addTask(): void {
    this.tasksService.addTask(this.task).subscribe(
     res => {
       var newTask = res.json();

       if(res.status == 200){
         this.taskSubmitted.emit({"message":"Tarefa adicionada com sucesso.", "success": true});
       }
     },
     error => console.log(error)
   );

   this.taskSubmitted.emit({"message":"Tarefa adicionada com sucesso.", "success": true});
  }

  saveTask(): void {
    this.tasksService.editTask(this.task).subscribe(
     res => {
       if(res.status == 200){
         this.taskSubmitted.emit({"message":"Tarefa atualizada com sucesso.", "success": true});
       }
     },
     error => console.log(error)
   );

  }

  setTask(task) {
    this.task = task;
  }


}
