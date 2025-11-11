import assignedComplaint from "../models/AssignedComplaint.js";
import Complaint from "../models/Complaint.js";


export const assignComplaint = async (req, res) => {
  try {
    const { complaintId, assignedTo } = req.params; // or req.body depending on your route

    // 1️⃣ Create assignment record
    const newAssignment = new assignedComplaint({
      complaintId,
      complaintRaisedUser: req.user._id,
      assignedTo,
    });

    await newAssignment.save();

    // 2️⃣ Update complaint status
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
        success: false,
      });
    }

    complaint.status = "assigned";
    await complaint.save();

    res.status(200).json({
      message: "Complaint assigned successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const getComplaintByUser = async (req, res) => {
   try {
      const complaints = await assignedComplaint
         .find({ complaintRaisedUser: req.user._id })
         .populate('assignedTo')

      if (!complaints || complaints.length === 0) {
         return res.status(404).json({
            message: 'No Data Found',
            success: false
         });
      }

      res.status(200).json({
         data: complaints,
         success: true
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         success: false
      });
   }
};


export const getComplaintByAssignedUser=async(req,res)=>{
    try {
      const complaints = await assignedComplaint
         .find({ assignedTo: req.user._id })
         .populate('complaintRaisedUser')

      if (!complaints || complaints.length === 0) {
         return res.status(404).json({
            message: 'No Data Found',
            success: false
         });
      }

      res.status(200).json({
         data: complaints,
         success: true
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         success: false
      });
   }
}


export const updateComplaintStatusByAssignedUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Update complaint status directly using findByIdAndUpdate
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,                         // complaint ID
      { status: "in_progress" },            // fields to update
      { new: true }                         // return the updated document
    );


    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};




