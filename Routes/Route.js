const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `You are a chatbot for Nexgenbyte. 
Use this website information to answer users questions: https://nexgenbyte.com/. If you don't know the answer, say you don't know. Be concise and helpful.
We Build Modern Websites That Help Local Businesses Grow
NexGenByte designs fast, responsive, and conversion-focused websites that turn visitors into real customers. From landing pages to full business websites, we help you stand out online.
At NexGenByte, we help local businesses grow by building modern, high-converting websites that turn visitors into real customers.
We believe a website should do more than just look good — it should generate calls, messages, and bookings. That’s why our approach focuses on clarity, performance, and conversion, not unnecessary complexity.Get In Touch
Pakistan Peshawar Gt road

+92 315 971123-7

 contact@nexgenbyte.com


`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Server error",
    });
  }
});
module.exports = router;