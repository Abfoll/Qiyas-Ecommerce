/* import {Router} from "express";

const router = Router();


router.post('/api/auth/register', (request, response) => {

});



router.post('/api/auth/login', (request,response) => {

});


router.post('/api/auth/logout',(request, response) => {

});


router.post('/api/auth/refresh-token', (request,response)=> {

});

router.post('/api/auth/forgot-password', (request, response) => {

});

router.post('/api/auth/reset-password', (request,response) => {

});

router.get('/api/auth/me', (request,response) => {

});

router.post('/api/auth/verify-email', (request,response) => {

});


export default router;
*/



import express from 'express';
import wishlistController from '../controllers/wishlistcontroller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', wishlistController.getWishlist);
router.post('/:productId', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

export default router;
