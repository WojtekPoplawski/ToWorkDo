import { Task } from "./db/entities.ts";
import { TaskRepository } from "./db/tasksRepository.ts";
import { TimelogsRepository } from "./db/timelogsRepository.ts";

export const startTimeLogging = () => {
  TaskRepository.getAllAssigned().then((tasks) => {
    tasks.forEach((task) => {
      console.log(task);
      task.assigned !== "none" &&
        TimelogsRepository.add({
          start: new Date(),
          status: task.assigned,
          task_id: task.id as number,
          time_spent: 0,
        });
    });
  });
};

export const stopTimeLogging = () => {
  TimelogsRepository.getAllNotDone().then((timelogs) => {
    timelogs.forEach((timelog) => {
      TimelogsRepository.edit({
        ...timelog,
        end: new Date(),
        time_spent: Math.round(
          (new Date().getTime() - timelog.start.getTime()) / 1000,
        ),
      });
    });
  });
};

export const timeloggedTaskStatusModification = (task: Task) => {
  TimelogsRepository.getAllNotDoneForTask(task.id as number).then(
    (timelogs) => {
      console.log(timelogs)
      if (timelogs.length > 0) {
        timelogs.forEach((timelog) => {
          TimelogsRepository.edit({
            ...timelog,
            end: new Date(),
            time_spent: Math.round(
              (new Date().getTime() - timelog.start.getTime()) / 1000,
            ),
          });
          task.assigned !== "none" &&
            TimelogsRepository.add({
              start: new Date(),
              status: task.assigned,
              task_id: task.id as number,
              time_spent: 0,
            });
        });
      }
    },
  );
};
