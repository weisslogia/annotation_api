import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import { IUser, IUserPost } from '../interfaces/user.interface';
import { create, index, remove, show, update } from '../controllers/user.controller';
import { verifyTokenPresent } from '../middlewares';

const router = express.Router();
router.route('/').get(verifyTokenPresent, async (req: Request, res: Response) => {
    try {
        const gateways: IUser[] = await index();
        res.status(200).json(gateways);
    } catch(e: any) {
        console.error(e)
        res.status(500).send(e.message ? e.message : 'Error');
    }
})

router.route('/:id').get(verifyTokenPresent, async (req: Request, res: Response) => {
    try {
        const gateways: IUser = await show(new mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(gateways);
    } catch(e: any) {
        console.error(e)
        res.status(404).send(e.message ? e.message : 'Error');
    }
})

router.route('/').post(verifyTokenPresent, async (req: Request, res: Response) => {
    try {
        const params: IUserPost = req.body
        const gateway: IUser = await create(params);
        res.status(201).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(422).send(e.message ? e.message : 'Error')
    }
})

router.route('/:id').put(verifyTokenPresent, async (req: Request, res: Response) => {
    try {
        const params: IUserPost = req.body
        const gateway: IUser = await update(req.params.id, params);
        res.status(200).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(404).send(e.message ? e.message : 'Error')
    }
})

router.route('/:id').delete(verifyTokenPresent, async (req: Request, res: Response) => {
    try {
        const gateway: IUser = await remove(req.params.id);
        res.status(200).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(404).send( e.message ? e.message : 'Error')
    }
})



export default router;