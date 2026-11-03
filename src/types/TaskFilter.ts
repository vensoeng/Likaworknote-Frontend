export interface TaskFilter {
  search: string;

  statusIds: number[];
  categoryIds: number[];
  typeIds: number[];

  createdFrom: string;
  createdTo: string;

  updatedFrom: string;
  updatedTo: string;

  // Schedule date filter
  scheduleFrom: string;
  scheduleTo: string;

  rateFrom: number | "";
  rateTo: number | "";
}

export const defaultTaskFilter: TaskFilter = {
  search: "",

  statusIds: [],
  categoryIds: [],
  typeIds: [],

  createdFrom: "",
  createdTo: "",

  updatedFrom: "",
  updatedTo: "",

  scheduleFrom: "",
  scheduleTo: "",

  rateFrom: "",
  rateTo: "",
};