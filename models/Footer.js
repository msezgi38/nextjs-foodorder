import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema(
  {
    location: {
      type: String,

    },
    email: {
      type: String,

    },
    phoneNumber: {
      type: String,

    },
    desc: {
      type: String,

    },
    socialMedia: {
      type: [
        {
          icon: { type: String },
          link: { type: String },
        },
      ],
    },
    openingHours: {
      type: {
        day: { type: String },
        hour: { type: String },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Footer || mongoose.model("Footer", FooterSchema);