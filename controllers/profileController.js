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
		// Find the user with the given email
		const user=await User.findOne({email});

		if(!user) {
			return res.status(404).json({error: 'User not found'});
		}

		const code=Math.floor(100000+Math.random()*900000);
		/**/

		const transporter=nodemailer.createTransport({
			// Replace with your SMTP server details
			service: "gmail",
			auth: {
				user: 'wafibnjd@gmail.com', // Replace with your email address
				pass: '54900777', // Replace with your email password
			},
		});

		// Set up the email content
		const mailOptions={
			from: 'wafibnjd@gmail.com', // Replace with the sender email address
			to: email,
			subject: 'Validation Code',
			text: `Please enter the following validation code in the appropriate field on our website to proceed:\n\n${code}`,
		};


		const x=await transporter.sendMail(mailOptions)
		console.log({x})
		res.status(200).json({message: 'Email sent with instructions for password reset'});
	} catch(error) {
		console.error(error);
		res.status(500).json({error: 'Server error'});
	}
}
module.exports={updateProfile,checkPassword,getvalidationCodeIntheEmail}

