import { api } from './api';
import {
  Task,
  TasksResponse,
  TaskFilterParams,
  CreateTaskInput,
  UpdateTaskInput,
} from '../types';

export const taskService = {
  async getTasks(params?: TaskFilterParams): Promise<TasksResponse> {
    const response = await api.get<TasksResponse>('/tasks', {
      params,
    });
    return response.data;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await api.get<{ success: boolean; task: Task }>(`/tasks/${id}`);
    return response.data.task;
  },

  async createTask(data: CreateTaskInput): Promise<Task> {
    const response = await api.post<{ success: boolean; message: string; task: Task }>(
      '/tasks',
      data
    );
    return response.data.task;
  },

  async updateTask(id: string, data: UpdateTaskInput): Promise<Task> {
    const response = await api.put<{ success: boolean; message: string; task: Task }>(
      `/tasks/${id}`,
      data
    );
    return response.data.task;
  },

  async deleteTask(id: string): Promise<string> {
    const response = await api.delete<{ success: boolean; message: string; id: string }>(
      `/tasks/${id}`
    );
    return response.data.id;
  },

  async toggleComplete(id: string, completed?: boolean): Promise<Task> {
    const response = await api.patch<{ success: boolean; message: string; task: Task }>(
      `/tasks/${id}/complete`,
      { completed }
    );
    return response.data.task;
  },
};
