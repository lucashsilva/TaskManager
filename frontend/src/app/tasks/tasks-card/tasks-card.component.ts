import {OnInit, Component,  Output,  Input,  EventEmitter,  OnChanges} from '@angular/core';
import { Task } from '../../tasks/task/task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss'],
})
export class TasksCardComponent implements OnInit, OnChanges {

  @Input() doneType;
  @Input() tasks: Task[]
  @Output('hasChanges') emitter: EventEmitter<boolean>;
  orderCriteria: string;


  constructor(private taskService: TaskService) {
    this.emitter = new EventEmitter<boolean>();
  }

  ngOnInit() {

  }

  fetchTasks() {
    this.emitter.emit(true);
  }

  sort() {
    if(this.orderCriteria === "name") {
      this.tasks.sort((t1, t2) => {
        if(t1.title > t2.title) {
          return 1;
        } else if (t2.title < t2.title) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (this.orderCriteria === "priority") {
      this.tasks.sort((t1, t2) => {
          return this.getPriorityLevel(t2) - this.getPriorityLevel(t1);
      });
    }
  }

  getPriorityLevel(task) {
    if(task.priority === "HIGH") {
      return 1;
    } else if (task.priority === "NORMAL") {
      return 0;
    } else { 
      return -1;
    }
  } 

  changeOrderCriteria(criteria) {
    this.orderCriteria = criteria;
    this.sort();
  }

  ngOnChanges() {
    this.sort();
  }
}
