import { Router } from "express";
import { createPlace, editPlace, getPlaces } from "../controller/placeController";

const router = Router();

router.get('/places', getPlaces);
router.post('/places', createPlace);
router.put('/places/:id', editPlace);

export default router;