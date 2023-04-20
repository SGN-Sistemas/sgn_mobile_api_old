import { Router } from 'express';
import { UpdateController } from '../../controllers/updateControllers';

export const routerUpdate = Router();

const updateController = new UpdateController();

routerUpdate.get('/:platform/:version', updateController.verify);
