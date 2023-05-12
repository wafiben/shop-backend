const User=require('../models/User')
const getAllCompanies=async (req,res) => {
	try {
		const companies=await User.find({role: ['company']});
		if(companies.length!==0) {
			return res.status(200).json({companies})
		} else {
			return res.status(404).json({msg: "no company exist yet"})
		}

	} catch(error) {
		res.status(500).json({msg: "failed to get companies"})
	}
}
const getAllClients=async (req,res) => {
	try {
		const users=await User.find({role: ['client']});
		if(users.length!==0) {
			return res.status(200).json({users})
		} else {
			return res.status(404).json({msg: 'no client exist yet'})
		}
	} catch(error) {
		res.status(500).json({msg: "get client is failed"})
	}
}


module.exports={getAllCompanies,getAllClients}