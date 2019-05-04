 const express = require('express');
 const router = express.Router();
 const { check, validationResult } = require('express-validator/check');
 const auth = require('../../middleware/auth');
  //import model
 const Post = require('../../models/Post');
 const User = require('../../models/User');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    
    [
      check('location', 'Location is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        location: req.body.location,
        description: req.body.description,
         image:  req.body.description,
         user:  req.body.user
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', async (req, res) => {
     try {
       const post = await Post.findById(req.params.id);
   
       if (!post) {
         return res.status(404).json({ msg: 'Post not found' });
       }
   
       res.json(post);
     } catch (err) {
       console.error(err.message);
       if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found' });
       }
       res.status(500).send('Server Error');
     }
   });

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
     try {
       const post = await Post.findById(req.params.id);
   
       if (!post) {
         return res.status(404).json({ msg: 'Post not found' });
       }
   
       // Check user
       if (post.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
       }
   
       await post.remove();
   
       res.json({ msg: 'Post removed' });
     } catch (err) {
       console.error(err.message);
         res.status(500).send('Server Error');
     }
   });


   
// @route    Put api/posts/Like/:id
// @desc     Like a post
// @access   Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Comment to post 

router.put('/comment/:id', auth, async (req, res)=>{
  try{
    //Get the post 
    const post = await Post.findById(req.params.id)
    //Get the user that posted comments and remove its password from the response
    const user = await User.findById(req.user.id).select('-password')
    const newComments = {
      text: req.body.text,
      name: user.name,
      user :req.user.id,
      image: user.image
    }
    // Add to post
    post.comments.unshift(newComments)
    //Save post
    await post.save()
   res.json(newComments)

  }catch(err){
    res.status(500).json({msg: "Server error"})
    console.log(err.message)
    
  }
})
 module.exports = router