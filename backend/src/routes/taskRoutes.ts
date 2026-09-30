import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
} from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Protect all task routes with JWT authentication
router.use(authenticate);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/complete', toggleTaskComplete);

export default router;
