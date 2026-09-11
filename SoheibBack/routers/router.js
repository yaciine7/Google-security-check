const express = require("express");
const router = express.Router();
const password = require('../Dbmodel');

router.post("/password", async (req, res) => {
  try {
    const text = req.body.password;
    if(text.trim() == "" || !text){
      return res.status(400).json({message : "Empty input"});
    }
    const newNote = new password({ text });
    const savedPass = await newNote.save();
    res.status(201).json(savedPass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;