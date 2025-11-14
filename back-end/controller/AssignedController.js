import assignedComplaint from "../models/AssignedComplaint.js";
import Complaint from "../models/Complaint.js";


export const assignComplaint = async (req, res) => {
  try {
    const { complaintId, assignedTo } = req.params; /
     
    const user=await Complaint.findById(complaintId).populate('createdBy');
   
    const newAssignment = new assignedComplaint({
      complaintId,
      complaintRaisedUser: user.createdBy._id,
      assignedTo,
    });

    await newAssignment.save();

   
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
      let complaints = await assignedComplaint
         .find({ complaintRaisedUser: req.user._id })
         .populate('complaintId')
         .populate('assignedTo');

      // Filter after populate because status exists only inside complaintId
      complaints = complaints.filter(c => c.complaintId?.status !== 'Completed');

      if (!complaints || complaints.length === 0) {
         return res.status(204).json({
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
         .find({ assignedTo: req.user._id }).populate('complaintId')
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
    const { id,status } = req.params;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,                         
      { status: status==3?"in_progress":"Completed" },            
      { new: true }                        
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




