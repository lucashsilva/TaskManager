import { Pipe } from "@angular/core";
import { Task } from '../task/task.component';

@Pipe({
  name: "datesort"
})
export class TaskDateSortPipe {
  transform(array: Array<Task>, args: string): Array<Task> {
    array.sort((a: Task, b: Task) => {
      if(a === null || b === null || a.timestamp === null || b.timestamp === null) {
        return 0;
      }

      let dateOne = new Date(a.timestamp);
      let dateTwo = new Date(b.timestamp);
  ;
      return dateOne.getTime() - dateTwo.getTime();
    });

    return array;
  }
}
