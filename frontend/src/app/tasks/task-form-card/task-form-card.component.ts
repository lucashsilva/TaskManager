import {Input, Component,  OnInit,  Output,  EventEmitter} from '@angular/core';
import { Task } from '../task/task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form-card',
  templateUrl: './task-form-card.component.html',
  styleUrls: ['./task-form-card.component.scss']
})
export class TaskFormCardComponent implements OnInit {
  @Input() category: string;
  @Output('hasChanges') emitter: EventEmitter<Task>;
  task: Task;
  errorMessage: string;

  constructor(private taskService: TaskService) {
    this.emitter = new EventEmitter<Task>();
  }

  ngOnInit() {
    this.reset();
  }

  save() {
    this.taskService.addTask(this.task).then(res => {
      this.emitter.emit(this.task);
      this.task = new Task();
    });

  }

  close() {
    this.emitter.emit(null);
  }

  reset() { 
    this.task = new Task();
    this.task.category = this.category;
  }
}
