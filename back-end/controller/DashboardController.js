import Complaint from "../models/Complaint.js";
import assignedComplaint from "../models/AssignedComplaint.js";

export const userDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;

        const complaints = await Complaint.find({ createdBy: userId });

        const details = {
            pending: 0,
            assigned: 0,
            progress: 0,
            completed: 0
        };
        complaints.forEach((c) => {
            if (c.status === "pending") details.pending++;
            if (c.status === "assigned") details.assigned++;
            if (c.status === "in_progress") details.progress++;
            if (c.status === "Completed") details.completed++;
        });

        const latest = await Complaint.find({ createdBy: userId })
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            details,
            latest
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const committeUserData = async (req, res) => {
    try {
        const userId = req.user._id;

        const assignedComplaints = await assignedComplaint.find({ assignedTo: userId }).populate('complaintId');

        const details = {
            assigned: 0,
            progress: 0,
            completed: 0
        };
        assignedComplaints.forEach((c) => {
            if (c.complaintId.status === "assigned") details.assigned++;
            if (c.complaintId.status === "in_progress") details.progress++;
            if (c.complaintId.status === "Completed") details.completed++;
        });

        return res.status(200).json({
            success: true,
            details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const adminData = async (req, res) => {
    try {
        const allComplaints = await Complaint.find({});

        const details = {
            pending: 0,
            assigned: 0,
            progress: 0,
            completed: 0
        }

        allComplaints.forEach((c) => {
            if (c.status === "pending") details.pending++;
            if (c.status === "assigned") details.assigned++;
            if (c.status === "in_progress") details.progress++;
            if (c.status === "Completed") details.completed++;
        });

        return res.status(200).json({
            success: true,
            details
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
