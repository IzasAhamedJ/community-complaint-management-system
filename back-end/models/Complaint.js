import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    houseNo: {
        type: String,
        required: true
    },
    houseThalaivarName: {
        type: String,
        required: true
    },
    houseThalaivarNumber: {
        type: Number,
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // native
    status: {
        type: String,
        enum: ["pending", "assigned", "in_progress", "resolved"],
        default: "pending",
    },
    image:{
        type:String,
        required:false
    }

}, { timestamps: true });


const Complaint=mongoose.model('Complaint',complaintSchema);

export default Complaint;