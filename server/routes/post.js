const express = require("express");
const {
  getPost,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  singlePost,
  like,
  unlike,
  comment,
  uncomment,
  getPostIdForLikes,
  findHash
} = require("../controllers/post");

const { requireSignin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPost);
//like unlike
router.put('/post/comment', requireSignin, comment)
router.put('/post/uncomment', requireSignin, uncomment)

//comments
router.put('/post/like', requireSignin, like)
router.put('/post/unlike', requireSignin, unlike)
router.get('/post/:postId', singlePost);


// post routes
router.get('/forIds', getPostIdForLikes)
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);

router.post('/search-for/:query', findHash)

router.get('/posts/by/:userId', requireSignin, postsByUser);


router.put('/post/:postId', requireSignin, isPoster, updatePost);

router.delete('/post/:postId', requireSignin, isPoster, deletePost);
// photo
router.get('/post/photo/:postId', photo);



// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

module.exports = router;
