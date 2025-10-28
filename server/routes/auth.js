router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    users.push({ email, password: hash });
    return res.status(201).json({ message: 'Registered' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
