const router = require ('express').Router();
const { User, Comment, BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

//create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({ ...req.body, user_id: req.session.user_id, });
        console.log("This is the new post", newBlogPost);
        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        console.log('DELETE/ bp router destroyed');
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });
        if (!blogPostData) {
            res.status(400).json({ message: 'No blogpost found with this id'});
            return;
        }
        res.status(200).json(blogPostData);
    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router;