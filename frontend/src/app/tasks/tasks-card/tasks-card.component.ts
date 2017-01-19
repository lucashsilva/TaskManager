import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Task } from '../../tasks/task/task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss'],
})
export class TasksCardComponent implements OnInit {

  @Input() doneType;
  @Input() tasks: Task[]
  @Output('hasChanges') emitter: EventEmitter<boolean>;


  constructor(private taskService: TaskService) {
    this.emitter = new EventEmitter<boolean>();
  }

  ngOnInit() {

  }

  fetchTasks() {
    this.emitter.emit(true);
  }


}
