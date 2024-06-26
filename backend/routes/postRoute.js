import express from 'express';
import {protectRoute} from '../middleware/protectRoute.js'
import { createPost, deletePost, CommentOnPost, likeUnlikePost, allPosts, getLikedPosts,
     getFollowingPosts, getUserPosts } from '../controllers/postController.js';

const router = express.Router();

router.get('/all', protectRoute, allPosts)
router.get('/following', protectRoute, getFollowingPosts)
router.get('/likes/:id', protectRoute, getLikedPosts)
router.get('/user/:username', protectRoute, getUserPosts)
router.post('/create', protectRoute, createPost)
router.post('/like/:id', protectRoute, likeUnlikePost)
router.post('/comment/:id', protectRoute, CommentOnPost)
router.delete('/:id', protectRoute, deletePost)
export default router;