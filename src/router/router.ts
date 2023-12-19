import { Router } from 'express';
import ver1 from './ver1/router';

const router = Router();

router.use('/v1', ver1);

export default router;
