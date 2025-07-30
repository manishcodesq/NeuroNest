// ml-services/models/VoiceFeature.js
import mongoose from 'mongoose';

const VoiceFeatureSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  features: Object,
  timestamp: { type: Date, default: Date.now }
});

const VoiceFeature = mongoose.model('VoiceFeature', VoiceFeatureSchema);
export default VoiceFeature;
