import { Router } from "express";
import { authenticateUser, createUser, loginUser, logoutUser } from "../controllers/userController.js";
import { createPost, getAllPosts, getFilteredPosts, getPost, updatePost } from "../controllers/postController.js";
import multer from "multer";
const upload = multer({dest: '/tmp'});

const router = Router();

router.route('/register').post(upload.single('file'), createUser);
router.route('/login').post(loginUser);
router.route('/profile').get(authenticateUser);
router.route('/logout').post(logoutUser);
router.route('/posts/:page').get(getAllPosts);
router.route('/post').post(upload.single('file'), createPost).put(upload.single('file'), updatePost);
router.route('/post/:action/:id').get(getPost);
router.route('/search').get(getFilteredPosts);

export default router;