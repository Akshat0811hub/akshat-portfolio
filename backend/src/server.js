import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { connectDB, getMongoStatus } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Allow preview deployments
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  })
);

app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    owner: 'Akshat Singh',
    database: getMongoStatus() ? 'mongodb-atlas' : 'local-persistent-json',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', contactRoutes);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Initialize DB & start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`⚡ Akshat Singh Portfolio API running on http://localhost:${PORT}`);
  });
});
