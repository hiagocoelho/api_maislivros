import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';

const Insert = (req: Request, res: Response, next: NextFunction) => {
    const book = getRepository(Book).create(req.body);
    getRepository(Book).save(book).then((book) => {
        if (book) {
            res.status(200).send(book);
        }
    })
    .catch(error => next(error));
}

const FetchAll = (req: Request, res: Response, next: NextFunction) => {
    getRepository(Book).find().then((books) => {
        if (books) {
            res.status(200).send(books)
        }
    })
    .catch(error => next(error));
};


const Update =  (req: Request, res: Response, next: NextFunction) => {
    const newBookParams = req.body;
    const id = req.params.id;

    getRepository(Book).findOne({ where: { id } }).then((book) => {
        if (book) {
            newBookParams.author && (book.author = newBookParams.author)
            newBookParams.title && (book.title = newBookParams.title)
            getRepository(Book).save(book).then((book) => {
                res.status(200).send(book);
            });
        } else {
            res.status(404).json({ "error": "Livro não encontrado!" });
        }
    })
    .catch(error => next(error));
};

const Delete = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    getRepository(Book).findOne({ where: { id } }).then((book) => {
        if (book) {
            getRepository(Book).delete(req.params.id).then(() => {
                res.sendStatus(200);
            })
        } else {
            res.status(404).json({ "error": "Livro não encontrado!" });
        }
    })
    .catch(error => next(error));
};

const Details = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    getRepository(Book).findOne({ where: { id } }).then((book) => {
        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).json({ "error": "Livro não encontrado!" });
        }
    })
    .catch(error => next(error));
}

export default { Insert, FetchAll, Update, Delete, Details }
