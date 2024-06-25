import express from 'express';
import {protectRoute} from '../middleware/protectRoute.js'
import { createPost, deletePost, CommentOnPost, likeUnlikePost, allPosts } from '../controllers/postController.js';

const router = express.Router();

router.get('/all', protectRoute, allPosts)
router.post('/create', protectRoute, createPost)
router.post('/like/:id', protectRoute, likeUnlikePost)
router.post('/comment/:id', protectRoute, CommentOnPost)
router.delete('/:id', protectRoute, deletePost)
export default router;