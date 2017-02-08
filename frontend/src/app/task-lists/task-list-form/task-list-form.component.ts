import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TaskListService } from '../../services/task-list.service';
import { TaskList } from '../task-list/task-list.component';
import { Task } from '../../tasks/task/task.component';

@Component({
  selector: 'app-task-list-form',
  templateUrl: './task-list-form.component.html',
  styleUrls: ['./task-list-form.component.scss']
})
export class TaskListFormComponent implements OnInit {
  errorMessage: string;
  @Input() editForm: boolean;
  @Input() list: TaskList;
  @Input() tasks: Array<Task>;
  @Output("hasChanges") emitter: EventEmitter<TaskList>;

  constructor(private listService: TaskListService) {
    this.emitter = new EventEmitter<TaskList>();
    this.list = new TaskList();
    this.tasks = new Array<Task>();
   }
   
  ngOnInit() {
  }

  addOrRemove(task: Task, event) {
    if(event.target.checked) {
      (<Array<Task>> this.list.tasks).push(task);
    } else {
      (<Array<Task>> this.list.tasks).splice((<Array<Task>> this.list.tasks).indexOf(task), 1);
    }
  }
  
  save() {
    for(let task of this.list.tasks) {
      task.taskLists = []; // this has to be done to avoid parsing errors since the subtasks come as titles 
    }
    if(this.editForm) {
      this.listService.editList(this.list).then(res => {
        this.emitter.emit(this.list);
         this.list = new TaskList();
      });
    } else {
      this.listService.addList(this.list).then(res => {
        this.emitter.emit(this.list);
        this.list = new TaskList();
      });
    }

    if(this.editForm) {
      this.editForm = false;
    }
  }

  close() {
    this.emitter.emit(null);
    if(this.editForm) {
      this.editForm = false;
    }
  }

  contains(task: Task): boolean {
    for(let taskL of this.list.tasks) {
      if(taskL.id === task.id) {
        return true;
      }
    }
    return false;
  }

}
