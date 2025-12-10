const mongoose = require("mongoose");

// ⭐ Sub-schema for brainprogram
const brainProgramSchema = new mongoose.Schema(
  {
    morning: { type: String, default: "" },
    night: { type: String, default: "" },
  },
  { _id: false }
);

// ⭐ Sub-schema for current plan
const currentPlanSchema = new mongoose.Schema(
  {
    brainprogram: { type: brainProgramSchema, default: () => ({}) },

    affirmation: { type: [String], default: [] },

    priorityTasks: { type: [String], default: [] },

    burningDesires: { type: [String], default: [] },

    expiryDate: { type: Date, default: null },

    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ⭐ Sub-schema for commitments
const commitmentsSchema = new mongoose.Schema(
  {
    whyNeverQuit: { type: String, default: "" },
    sacrificeLevel: { type: String, default: "" },
    extraDetails: { type: String, default: "" },
  },
  { _id: false }
);

// ⭐ MAIN USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },

    name: { type: String, default: "" },

    password: { type: String, required: true },

    goals: { type: [String], default: [] },

    mainGoal: { type: String, default: "" },

    commitments: { type: commitmentsSchema, default: () => ({}) },

    currentPlan: { type: currentPlanSchema, default: () => ({}) },

    isVerified: { type: Boolean, default: false },

    progressHistory: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
