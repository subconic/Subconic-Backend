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

    mainGoal: { 
      type: Object, 
      default: {}
    },

    currentPlan: {
      type: Object,
      default: {}
    },

    progress: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    reminders: {
      type: Array,
      default: []
    }

  },
  { 
    timestamps: true,
    minimize: false  // Preserves empty objects
  }
);

module.exports = mongoose.model("User", userSchema);
