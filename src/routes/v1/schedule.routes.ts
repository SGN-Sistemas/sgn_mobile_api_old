import { Router } from 'express';
import { ScheduleControllers } from '../../controllers/scheduleControllers';

export const routerSchedule = Router();

const scheduleControllers = new ScheduleControllers();

routerSchedule.get('/', scheduleControllers.list);
