const express = require('express');
const router = express.Router();
const pollService = require('..\services\pollService.js');

// 1. Create a new poll
router.post('/create', async (req, res) => {
  const { title } = req.body;
  try {
    const tx = await pollService.createPoll(title);
    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ success: false, message: "Failed to create poll" });
  }
});

// 2. Add a candidate to a poll
router.post('/:id/add-candidate', async (req, res) => {
  const pollIndex = req.params.id;
  const { name } = req.body;
  try {
    const tx = await pollService.addCandidate(pollIndex, name);
    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json({ success: false, message: "Failed to add candidate" });
  }
});

// 3. Mint a token for a poll
router.post('/:id/mint', async (req, res) => {
  const pollIndex = req.params.id;
  try {
    const tx = await pollService.mintToken(pollIndex);
    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Error minting token:", error);
    res.status(500).json({ success: false, message: "Failed to mint token" });
  }
});

// 4. Toggle poll status (open/close)
router.post('/:id/toggle', async (req, res) => {
  const pollIndex = req.params.id;
  try {
    const tx = await pollService.togglePollStatus(pollIndex);
    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Error toggling poll status:", error);
    res.status(500).json({ success: false, message: "Failed to toggle poll status" });
  }
});

// 5. Vote for a candidate
router.post('/:id/vote', async (req, res) => {
  const pollIndex = req.params.id;
  const { candidateIndex } = req.body;
  try {
    const tx = await pollService.vote(pollIndex, candidateIndex);
    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Error voting:", error);
    res.status(500).json({ success: false, message: "Failed to vote" });
  }
});

// 6. Get all candidates for a poll
router.get('/:id/candidates', async (req, res) => {
  const pollIndex = req.params.id;
  try {
    const count = await pollService.getCandidateCount(pollIndex);
    const candidates = [];
    for (let i = 0; i < count; i++) {
      const candidate = await pollService.getCandidate(pollIndex, i);
      candidates.push(candidate);
    }
    res.status(200).json({ success: true, candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ success: false, message: "Failed to get candidates" });
  }
});

// 7. Get total number of polls
router.get('/', async (req, res) => {
  try {
    const count = await pollService.getPollCount();
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error fetching poll count:", error);
    res.status(500).json({ success: false, message: "Failed to get poll count" });
  }
});

module.exports = router;
