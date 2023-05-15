const User=require('../models/User')
const getAllCompanies=async (req,res) => {
	try {
		const companies=await User.find({role: ['company']}).select('-password -products');
		const activatedUser=await User.find({
			$and: [
				{ban: {$ne: true}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['company']} // select users where role is 'client'
			]
		}).select('-password -products');
		const bannedUser=await User.find({
			$and: [
				{ban: {$ne: false}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['company']} // select users where role is 'client'
			]
		}).select('-password -products');
		if(companies.length!==0) {
			return res.status(200).json({users: companies,activatedUser,bannedUser})
		} else {
			return res.status(404).json({msg: "no company exist yet"})
		}

	} catch(error) {
		res.status(500).json({msg: "failed to get companies"})
	}
}
const getAllClients=async (req,res) => {
	try {
		const users=await User.find({role: ['client']}).select('-password -products');
		const activatedUser=await User.find({
			$and: [
				{ban: {$ne: true}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['client']} // select users where role is 'client'
			]
		}).select('-password -products');
		const bannedUser=await User.find({
			$and: [
				{ban: {$ne: false}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['client']} // select users where role is 'client'
			]
		}).select('-password -products');
		if(users.length!==0) {
			return res.status(200).json({users,activatedUser,bannedUser})
		} else {
			return res.status(404).json({msg: 'no client exist yet'})
		}
	} catch(error) {
		res.status(500).json({msg: "get client is failed"})
	}
}
const banClient=async (req,res) => {
	const {id}=req.params
	try {
		const user=await User.findById(id);
		user.ban=!user.ban;
		await user.save();
		const users=await User.find({role: ['client']}).select('-password -products');
		const activatedUser=await User.find({
			$and: [
				{ban: {$ne: true}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['client']} // select users where role is 'client'
			]
		}).select('-password -products');
		const bannedUser=await User.find({
			$and: [
				{ban: {$ne: false}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['client']} // select users where role is 'client'
			]
		}).select('-password -products');
		res.status(200).json({users,activatedUser,bannedUser})
	} catch(error) {
		res.status(500).json({msg: "ban user client is feild"})
	}
}
const banCompany=async (req,res) => {
	const {id}=req.params
	try {
		const user=await User.findById(id);
		user.ban=!user.ban;
		await user.save();
		const companies=await User.find({role: ['company']}).select('-password -products');

		const activatedUser=await User.find({
			$and: [
				{ban: {$ne: true}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['company']} // select users where role is 'client'
			]
		}).select('-password -products');
		const bannedUser=await User.find({
			$and: [
				{ban: {$ne: false}}, // select users where ban is not true (i.e., false or undefined)
				{role: ['company']} // select users where role is 'client'
			]
		}).select('-password -products');
		res.status(200).json({users: companies,activatedUser,bannedUser})
	} catch(error) {
		res.status(500).json({msg: "ban user company is feild"})
	}
}


module.exports={getAllCompanies,getAllClients,banClient,banCompany}