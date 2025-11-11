import mongoose from "mongoose";

const assignedComplaintSchema = new mongoose.Schema({
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint",
    required: true
  },
  complaintRaisedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedAt: {
    type: Date,
    default: Date.now
  }
});


const assignedComplaint=mongoose.model('assignedComplaints',assignedComplaintSchema);

export default assignedComplaint