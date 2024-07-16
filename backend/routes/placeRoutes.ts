import { Router } from "express";
import { createPlace, deletePlace, editPlace, getPlaces } from "../controller/placeController";

const router = Router();

router.get('/places', getPlaces);
router.post('/places', createPlace);
router.put('/places/:id', editPlace);
router.delete('/places/:id', deletePlace);

export default router;