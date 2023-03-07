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

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "Thoughtname": "lernantino",
//   "ThoughtId": "5edff358a0fcb779aa7b118b"
// }

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

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value