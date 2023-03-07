const { User } = require('../../model')
const router = require('express').Router();


// GET all users

router.get('/', async (req, res) => {
    const users = await User.find().populate({ path: "friends", model: User });
    if (!users) {
        res.status(200).json('[]');
    }
    res.status(200).json(users);
});

// GET a single user by its _id and populated thought and friend data

router.get('/:user_id', async (req, res) => {
    const user = await User.findById(req.params.user_id);
    if (!user) {
        res.status(404).end();
    }
    await user.populate({ path: "friends", model: User });
    res.status(200).json(user);
});

// POST a new user:
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }


router.post('/', async (req, res) => {
    await User.create(req.body, (err, doc) => {
        if (err) {
            res.status(500).json(`not today: ${err}`);
            return;
        }
        return User.findById(doc._id).populate({path: "friends", model: User}).exec((err, doc) => {
            if (err) {
                res.status(500).json(`not today: ${err}`);
                return
            }
            res.status(200).json(doc);
            return;
        })
    });
});


//PUT to update a user by its _id

router.put('/:user_id', (req, res) => {
    const user = User.findByIdAndUpdate(req.params.user_id, req.body, {new: true}, async (err, doc) => {
        if (err) {
            res.status(500).json(err);
        } else if (!doc.id) {
            res.status(404).end()
        } else {
            await doc.populate({path: 'friends', model: User});
            res.status(200).json(doc);
        }
    });
});


//DELETE to remove user by its _id


router.delete('/:user_id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'difficult to find happiness and user with this id' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
     });



module.exports = userController;
