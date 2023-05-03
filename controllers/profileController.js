const User=require('../models/User.js');
const bcrypt=require('bcryptjs');
const updateProfile=async (req,res) => {
	const userInfo=req.body;
	const id=req.user._id.toString()
	try {
		const user=await User.findById(id);
		if(userInfo.password) {
			const hashedPassword=await bcrypt.hash(userInfo.password,10);
			userInfo.password=hashedPassword;
		}
		const updatedUser={...user._doc,...userInfo}

		const newUser=await User.findOneAndUpdate({_id: id},updatedUser,{
			new: true
		});
		return res.status(200).json({user: newUser})
	} catch(error) {
		res.status(500).json({msg: "update user is failed"});
	}
}
module.exports={updateProfile}