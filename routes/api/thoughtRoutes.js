const { Thought } = require("../../model");
const router = require("express").Router();

// /api/thoughts


// GET to get all thoughts


router.get('/', async (req, res) => {
    const thoughts = await Thought.find().populate({ path: "friends", model: thought });
    if (!thoughts) {
        res.status(200).json('[]');
    }
    res.status(200).json(thoughts);
});

// GET to get a single thought by its _id

router.get('/api/thoughts/:thoughtId', async (req, res) => {
    const thought = await thought.findById(req.params.thoughtId);
    if (!thought) {
        res.status(404).end();
    }
    await thought.populate({ path: "friends", model: thought });
    res.status(200).json(thought);
});

// POST to create a new thought (don't forget to push the created thought's _id to the associated Thought's thoughts array field)



router.post('/', (req, res) => {
    thought.create(req.body, (err, doc) => {
        if (err) {
            res.status(500).json(`not today: ${err}`);
        } else { 
            res.status(200).json(doc);
        }
    })
});


// PUT to update a thought by its _id

router.put('/:thoughtId', (req, res) => {
    const thought = Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {new: true}, async (err, doc) => {
        if (err) {
            res.status(500).json(err);
        } else if (!doc.id) {
            res.status(404).end()
        } else {
            await doc.populate({path: 'friends', model: Thought});
            res.status(200).json(doc);
        }
    });
});


// DELETE to remove a thought by its _id

router.delete('/:thoughtId', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughData) {
          return res.status(404).json({ message: 'difficult to find happiness and thought with this id' });
        }
        res.json(dbThoughData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
     });


// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

router.post('api/thoughts/:thoughtId/reactions', (req, res) => {
    thought.create(req.body, (err, doc) => {
        if (err) {
            res.status(500).json(`not today: ${err}`);
        } else { 
            res.status(200).json(doc);
        }
    })
});


// DELETE to pull and remove a reaction by the reaction's reactionId value

router.delete('api/thoughts/:thoughtId/reactions/:reactionId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.reactionId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'difficult to find happiness and thought with this id' });
        }
        res.json(dbthoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
     });
