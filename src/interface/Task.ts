import { TASK_STATUS } from "../constatnts/TaskStatus";

export interface Task {
  userId: number;
  id: number;
  title: string;
  status: TASK_STATUS;
}

export interface getTaskQuery {
  q?: string;
  page?: number;
  size?: number;
}
