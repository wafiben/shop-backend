const User=require('../models/User.js');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
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



const checkPassword=async (req,res) => {
	const id=req.user.id.toString();
	const {password}=req.body
	try {
		const user=await User.findById(id);
		const result=await bcrypt.compare(password,user.password);
		res.status(200).json({result})
	} catch(error) {
		res.status(500).json({msg: "check password failed"});
	}
}


const getvalidationCodeIntheEmail=async (req,res) => {
	const {email}=req.body;
	try {
		const user=await User.findOne({email});
		if(!user) {
			return res.status(404).json({error: 'User not found'});
		}
		const code=Math.floor(100000+Math.random()*900000);
		const transporter=nodemailer.createTransport({
			host: "wafibnjd@gmail.com",
			service: "gmail",
			auth: {
				user: 'wafibnjd@gmail.com', // Replace with your email address
				pass: 'iilyhkrmdnblzrlj', // Replace with your email password
			},
			tls: {
				rejectUnauthorized: true,
				minVersion: "TLSv1.2"
			}
		});
		user.validationCode=code;
		await user.save();

		// Set up the email content
		const mailOptions={
			from: 'wafibnjd@gmail.com', // Replace with the sender email address
			to: email,
			subject: 'Validation Code',
			html: `<p>Please set this code on the website to be able to activate the operation:</p>
			<p><strong>${code}</strong></p>`,
		};
		transporter.sendMail(mailOptions,(error,info) => {
			if(error) {
				res.status(404).json({msg: "failed to send email"})
			} else {

				res.status(200).json({message: 'check the email , the code was sent to your email'});
			}
		});

	} catch(error) {
		res.status(500).json({error: 'Server error'});
	}
}
const checkValidationCode=async (req,res) => {
	const {code,email}=req.body
	try {
		const user=await User.findOne({email});
		if(!user) {
			return res.status(404).json({error: 'User not found'});
		}
		const result=user.validationCode==code
		res.status(200).json({result})
	} catch(error) {
		res.status(500).json({error: 'check code validation is failed '});
	}
}
module.exports={updateProfile,checkPassword,getvalidationCodeIntheEmail,checkValidationCode}

