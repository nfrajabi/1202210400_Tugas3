const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers.authorization;

  // Pastikan token ada di header Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Unauthorized: Token is required');
    return res.status(401).json({ error: 'Unauthorized: Token is required' });
  }

  // Mendapatkan token dari string Authorization header (Bearer <token>)
  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi token menggunakan kunci rahasia yang sesuai
    const decoded = jwt.verify(token, 'your_secret_key');
    console.log('Decoded token:', decoded);
    // Menyimpan informasi pengguna yang diverifikasi di objek permintaan (req)
    req.user = decoded;
    next(); // Lanjutkan ke middleware berikutnya
  } catch (error) {
    // Tangani kesalahan jika token tidak valid
    console.log('Unauthorized: Invalid token');
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
