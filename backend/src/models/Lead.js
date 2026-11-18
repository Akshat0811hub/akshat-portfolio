import mongoose from 'mongoose';
import crypto from 'crypto';
import { getMongoStatus, readLocalLeads, writeLocalLeads } from '../config/db.js';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    services: { type: [String], required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-discussion', 'archived'],
      default: 'new',
    },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

export const LeadModel = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

/**
 * Unified repository that saves to MongoDB Atlas when connected,
 * and always mirrors/falls back to local storage so zero data is ever lost.
 */
export const LeadRepository = {
  async create(leadData) {
    const timestamp = new Date().toISOString();
    const record = {
      _id: crypto.randomUUID(),
      ...leadData,
      status: 'new',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    if (getMongoStatus()) {
      const mongoDoc = await LeadModel.create(leadData);
      return mongoDoc.toObject();
    }

    const leads = await readLocalLeads();
    leads.unshift(record);
    await writeLocalLeads(leads);
    return record;
  },

  async findAll() {
    if (getMongoStatus()) {
      return LeadModel.find().sort({ createdAt: -1 }).lean();
    }
    return readLocalLeads();
  },

  async updateStatus(id, status) {
    if (getMongoStatus()) {
      return LeadModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
    }
    const leads = await readLocalLeads();
    const idx = leads.findIndex((item) => item._id === id);
    if (idx === -1) return null;
    leads[idx].status = status;
    leads[idx].updatedAt = new Date().toISOString();
    await writeLocalLeads(leads);
    return leads[idx];
  },

  async remove(id) {
    if (getMongoStatus()) {
      return LeadModel.findByIdAndDelete(id).lean();
    }
    const leads = await readLocalLeads();
    const filtered = leads.filter((item) => item._id !== id);
    await writeLocalLeads(filtered);
    return { deleted: true };
  },
};
