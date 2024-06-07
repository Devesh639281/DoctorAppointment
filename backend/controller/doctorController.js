import doctorModel from "../models/doctorModel.js";
export const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor data fetch Success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching During Doctor Detail ",
      success: false,
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor profile is updated Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Doctor Profile is Updated Successfully",
      success: false,
      error,
    });
  }
};

export const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doctor information",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error When getting Single Doctor Information",
      success: false,
      error,
    });
  }
};
