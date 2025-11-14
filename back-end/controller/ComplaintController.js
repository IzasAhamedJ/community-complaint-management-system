
import Complaint from "../models/Complaint.js";

export const createComplaints = async (req, res) => {
    try {
        const {
            title,
            description,
            street,
            contact,
            houseNo,
            houseThalaivarName,
            houseThalaivarNumber,
        } = req.body;

        // Create new complaint
        const complaint = new Complaint({
            title,
            description,
            street,
            contact,
            houseNo,
            houseThalaivarName,
            houseThalaivarNumber,
            createdBy: req.user._id, // assuming user is authenticated
            image: req.file ? `/uploads/${req.file.filename}` : null, // save image path if uploaded
        });

        await complaint.save();

        res.status(201).json({
            success: true,
            message: "Complaint created successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create complaint",
        });
    }
};


export const getComplaints = async (req, res) => {
    try {
        const userId = req.user._id;
        const getAllComplaints = await Complaint.find({ createdBy: userId });

        res.status(200).json({
            data: getAllComplaints,
            sucess: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            sucess: false
        })
    }
}

export const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;

        const complaint = await Complaint.findByIdAndDelete(id);

        res.status(200).json({
            message: 'complaint deleted successfully',
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            succes: false
        })
    }
}


export const getAllUserComplaints = async(req,res) => {
    try {
        const getAlluserComplaintData = await Complaint.find({}).populate('createdBy')

        res.status(200).json({
            data: getAlluserComplaintData,
            success: true
        })
    } catch (error) {

        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}
