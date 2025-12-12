const mongoose = require("mongoose");

// ⭐ MAIN USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },

    name: { 
      type: String, 
      default: "" 
    },

    password: { 
      type: String, 
      required: true 
    },

    goals: { 
      type: [String], 
      default: [] 
    },

    mainGoal: { 
      type: String, 
      default: "" 
    },

    commitments: {
      type: Object,
      default: {}
    },

    // ⭐ CURRENT PLAN - COMPLETELY FLEXIBLE
    currentPlan: {
      type: Object,
      default: {}
    },

    isVerified: { 
      type: Boolean, 
      default: false 
    },

    progressHistory: { 
      type: Array, 
      default: [] 
    },

    // ⭐ OPTIONAL: Add tasks array at root level
    tasks: {
      type: Array,
      default: []
    },

    // ⭐ OPTIONAL: Add progress tracking at root level
    progress: {
      type: Object,
      default: {}
    }
  },
  { 
    timestamps: true,
    minimize: false  // Preserves empty objects
  }
);

module.exports = mongoose.model("User", userSchema);
