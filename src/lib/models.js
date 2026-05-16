import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    email: { type: String },
    phone: { type: String },
    socialLinks: {
      linkedin: String,
      twitter: String,
      github: String,
      dribbble: String,
      behance: String,
    },
  },
  { timestamps: true }
);

const servicesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    details: { type: String },
    technologies: [String],
    price: { type: String },
  },
  { timestamps: true }
);

const scheduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: String, default: '30 mins' },
    service: { type: String },
    message: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' },
  },
  { timestamps: true }
);

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Services = mongoose.models.Services || mongoose.model('Services', servicesSchema);
export const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

const visitorSchema = new mongoose.Schema(
  {
    path: { type: String, default: '/' },
  },
  { timestamps: true }
);

export const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);
