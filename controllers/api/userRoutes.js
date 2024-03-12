const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// signup new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: `Account created for ${dbUserData.username}`});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login user ('/api/user/login')
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //check password
    const validPassword = await dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //create session and send response back
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      //response to user
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout
router.post('/logout', withAuth, async (req, res) => {
  try{  
    if (req.session.logged_in) {
      console.log('POST / logout accessed');
      req.session.destroy(() => {
        res.status(204).end();
    });
    } else {
      res.status(404).end();
    }
  } catch {
    res.status(400).end();
  }
});

module.exports = router;