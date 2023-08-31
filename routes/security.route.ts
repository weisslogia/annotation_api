import express, {Request, Response} from 'express';
import { login } from '../controllers/security.controller';

const router = express.Router();
router.route('/login').post(async (req: Request, res: Response) => {
    try {
        const token = await login(req.body.username, req.body.password);
        if(token) {
            res.status(200).json({token});
        } else {
            res.status(401).json({message: "Username or password incorrect"})
        }
    } catch(e: any) {
        console.error(e)
        res.status(500).send(e.message ? e.message : 'Error');
    }
})



export default router;