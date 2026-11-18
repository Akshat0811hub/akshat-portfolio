import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_DB_PATH = path.join(__dirname, '../../data/leads.json');

let isMongoConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (uri && !uri.includes('<username>')) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      isMongoConnected = true;
      console.log('[DB] Connected to MongoDB Atlas successfully.');
      return;
    } catch (error) {
      console.warn('[DB] MongoDB connection failed, falling back to local persistent JSON store:', error.message);
    }
  } else {
    console.log('[DB] No MONGODB_URI configured — using built-in persistent local store (backend/data/leads.json).');
  }

  // Ensure local fallback store exists
  const dir = path.dirname(LOCAL_DB_PATH);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(LOCAL_DB_PATH);
  } catch {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getMongoStatus() {
  return isMongoConnected;
}

export async function readLocalLeads() {
  try {
    const raw = await fs.readFile(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeLocalLeads(leads) {
  const dir = path.dirname(LOCAL_DB_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(leads, null, 2), 'utf-8');
}
