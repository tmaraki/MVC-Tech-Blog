const router = require ('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log('POST/ bp router accessed');
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

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
            res.status(400).json({message: 'No blogpost found with this id'});
            return;
        }
        res.status(200).json(blogPostData);
    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router;