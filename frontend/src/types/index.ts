export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string | null;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export interface TasksResponse {
  success: boolean;
  count: number;
  stats: TaskStats;
  tasks: Task[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export type FilterStatus = 'all' | 'pending' | 'completed';
export type FilterPriority = 'all' | 'low' | 'medium' | 'high';
export type SortField = 'createdAt' | 'dueDate' | 'priority' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface TaskFilterParams {
  status?: FilterStatus;
  priority?: FilterPriority;
  search?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string | null;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: Priority;
  dueDate?: string | null;
  completed?: boolean;
}
