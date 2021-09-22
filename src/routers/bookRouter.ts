import express from 'express';
import bookController from '../controllers/bookController';

const bookRouter = express.Router();

bookRouter.get('', bookController.FetchAll);
bookRouter.get('/:id', bookController.Details);
bookRouter.post('', bookController.Insert);
bookRouter.put('/:id', bookController.Update);
bookRouter.delete('/:id', bookController.Delete);


export default bookRouter;