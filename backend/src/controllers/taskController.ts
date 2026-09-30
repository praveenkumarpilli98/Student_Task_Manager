import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Task, PriorityLevel } from '../models/Task';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all tasks for current user (with search, filter, and stats)
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { status, priority, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const query: any = { userId };

    // Filter by status (completed / pending)
    if (status === 'completed') {
      query.completed = true;
    } else if (status === 'pending') {
      query.completed = false;
    }

    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes((priority as string).toLowerCase())) {
      query.priority = (priority as string).toLowerCase();
    }

    // Search query in title or description
    if (search && typeof search === 'string' && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    // Determine sort
    const order = sortOrder === 'asc' ? 1 : -1;
    let sortObj: any = {};
    if (sortBy === 'dueDate') {
      // Put null dueDates last when sorting ascending
      sortObj = { dueDate: order, createdAt: -1 };
    } else if (sortBy === 'title') {
      sortObj = { title: order };
    } else if (sortBy === 'priority') {
      sortObj = { priority: order, createdAt: -1 };
    } else {
      sortObj = { createdAt: order };
    }

    const tasks = await Task.find(query).sort(sortObj);

    // Compute stats for current user
    const totalCount = await Task.countDocuments({ userId });
    const completedCount = await Task.countDocuments({ userId, completed: true });
    const pendingCount = totalCount - completedCount;

    res.status(200).json({
      success: true,
      count: tasks.length,
      stats: {
        total: totalCount,
        completed: completedCount,
        pending: pendingCount,
      },
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
      return;
    }

    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found or you are not authorized to view it.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
      res.status(400).json({
        success: false,
        message: 'Task title is required.',
      });
      return;
    }

    const validPriority: PriorityLevel = ['low', 'medium', 'high'].includes(
      priority?.toLowerCase()
    )
      ? (priority.toLowerCase() as PriorityLevel)
      : 'medium';

    let parsedDueDate: Date | null = null;
    if (dueDate) {
      const date = new Date(dueDate);
      if (isNaN(date.getTime())) {
        res.status(400).json({
          success: false,
          message: 'Invalid due date format.',
        });
        return;
      }
      parsedDueDate = date;
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: validPriority,
      dueDate: parsedDueDate,
      completed: false,
      userId,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task by ID
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const { title, description, priority, dueDate, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
      return;
    }

    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found or you are not authorized to edit it.',
      });
      return;
    }

    if (title !== undefined) {
      if (title.trim() === '') {
        res.status(400).json({
          success: false,
          message: 'Task title cannot be empty.',
        });
        return;
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (priority !== undefined) {
      if (!['low', 'medium', 'high'].includes(priority.toLowerCase())) {
        res.status(400).json({
          success: false,
          message: 'Priority must be low, medium, or high.',
        });
        return;
      }
      task.priority = priority.toLowerCase() as PriorityLevel;
    }

    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === '') {
        task.dueDate = null;
      } else {
        const date = new Date(dueDate);
        if (isNaN(date.getTime())) {
          res.status(400).json({
            success: false,
            message: 'Invalid due date format.',
          });
          return;
        }
        task.dueDate = date;
      }
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully.',
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task by ID
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
      return;
    }

    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found or you are not authorized to delete it.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
      id,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle or mark task completion
// @route   PATCH /api/tasks/:id/complete
// @access  Private
export const toggleTaskComplete = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const { completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
      return;
    }

    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found or you are not authorized to update it.',
      });
      return;
    }

    // Toggle if not explicitly specified, or set explicit boolean
    task.completed = typeof completed === 'boolean' ? completed : !task.completed;
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: `Task marked as ${updatedTask.completed ? 'completed' : 'pending'}.`,
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
