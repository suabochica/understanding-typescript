import { Router} from 'express';

import { createTodo, getTodos, getTodo, modifyTodo, removeTodo } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/',  getTodos);

router.get('/:id', getTodo);

router.put('/:id');

router.patch('/:id',  modifyTodo);

router.delete('/:id', removeTodo);

export default router;
