import Hospital from "../models/hospitalModel.js";
import bcryptjs from "bcryptjs";


export const signup = async (req, res) => {
    const { registerID, HospitalName, email, password, address } = req.body;

    if(!registerID || !HospitalName || !email || !password || !address || !registerID === "" || !HospitalName === "" || !email === "" || !password === "" || !address === "") {
        return res.status(400).json({message: "All fields are required"})
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newHospital = new Hospital({
        registerID, HospitalName, email, password: hashedPassword, address
    });

    try{
        await newHospital.save();
        res.status(201).json(newHospital);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}