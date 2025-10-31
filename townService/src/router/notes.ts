import express from 'express';

const router = express.Router();

// Retrieve data for existing notes
router.get('/', async (_req, res) => {
  res.json([
    { id: '1', content: 'This is the first note.' },
    { id: '2', content: 'This is the second note.' },
  ]);
});

// Create a new note
router.post('/', async (req, res) => {
  const { content } = req.body;
  res.status(201).json({ message: 'Note created', content });
});

// Update an existing note
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  res.json({ message: `Note ${id} updated`, content });
});

export default router;
