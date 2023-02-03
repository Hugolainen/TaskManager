export interface ITask {
  id: string;
  type: string;
  title: string;
  description: string;
  date: Date;
}

export interface ISearchTaskQuery {
  taskType: string;
  taskStatus: string;
  date: Date;
}
