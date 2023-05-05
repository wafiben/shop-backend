const multer=require("multer");
const {GridFsStorage}=require("multer-gridfs-storage");
const path = require("path");

const storage=new GridFsStorage({
	url: "mongodb+srv://wafi:54900777@cluster0.ewu3a.mongodb.net/?retryWrites=true&w=majority",
	options: {useNewUrlParser: true,useUnifiedTopology: true},
	file: (req,file) => {
		const match=["image/png","image/jpeg","image/jpg"];

		if(match.indexOf(file.mimetype)===-1) {
			const filename=`${Date.now()}-image${path.extname(file.originalname)}`;
			return filename;
		}

		return {
			bucketName: "photos",
			filename: `${Date.now()}-image${path.extname(file.originalname)}`,
		};
	},
});

const upload=multer({storage});

module.exports=upload;
