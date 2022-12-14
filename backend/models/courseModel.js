const mongoose = require("mongoose");
const validator = require("validator");

const duration = {
  hours: {
    type: Number,
    default: 0,
  },
  minutes: {
    type: Number,
    default: 0,
  },
};

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Course name."],
    trim: true,
  },
  description: {
    type: String,
  },
  totalTracks: {
    type: Number,
    default: 0,
  },
  doneTracks: {
    type: Number,
    default: 0,
  },
  totalDuration: duration,
  doneDuration: duration,
  tracks: [
    {
      name: {
        type: String,
        required: [true, "Please Enter the Track name"],
        minLength: [2, "Password should be greater than 8 characters"],
      },
      done: {
        type: Boolean,
        default: false,
      },
      bookmark: {
        type: Boolean,
        default: false,
      },
      notes: {
        type: String,
      },
      url: {
        type: String,
        validate: [validator.isURL, "Please Enter a valid URL"],
      },
      totalDuration: duration,
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

courseSchema.methods.addDoneDuration = function (hours, minutes) {
  this.doneDuration.hours += hours;
  this.doneDuration.minutes += minutes;

  this.doneDuration.hours += parseInt(this.doneDuration.minutes / 60);

  this.doneDuration.minutes = this.doneDuration.minutes % 60;
};

courseSchema.methods.subtractDoneDuration = function (hours, minutes) {
  this.doneDuration.hours -= hours;
  this.doneDuration.minutes -= minutes;

  this.doneDuration.hours += parseInt(this.doneDuration.minutes / 60);
  this.doneDuration.minutes = this.doneDuration.minutes % 60;

  if (this.doneDuration.minutes < 0) {
    if (this.doneDuration.hours < 0) {
      this.doneDuration.hours += hours;
      this.doneDuration.minutes += minutes;
      return;
    }
    this.doneDuration.hours -= parseInt((-1 * this.doneDuration.minutes) / 60) + 1;
    this.doneDuration.minutes = 60 + this.doneDuration.minutes;
  }
};

courseSchema.methods.addTotalDuration = function (hours, minutes) {
  this.totalDuration.hours += hours;
  this.totalDuration.minutes += minutes;

  this.totalDuration.hours += parseInt(this.totalDuration.minutes / 60);

  this.totalDuration.minutes = this.totalDuration.minutes % 60;
};

courseSchema.methods.subtractTotalDuration = function (hours, minutes) {
  this.totalDuration.hours -= hours;
  this.totalDuration.minutes -= minutes;

  this.totalDuration.hours += parseInt(this.totalDuration.minutes / 60);

  this.totalDuration.minutes = this.totalDuration.minutes % 60;

  if (this.totalDuration.minutes < 0) {
    if (this.totalDuration.hours < 0) {
      this.totalDuration.hours += hours;
      this.totalDuration.minutes += minutes;
      return;
    }
    this.totalDuration.hours -= ((-1 * this.totalDuration.minutes) % 60) + 1;
    this.totalDuration.minutes = 60 - this.totalDuration.minutes;
  }
};

module.exports = mongoose.model("Course", courseSchema);
