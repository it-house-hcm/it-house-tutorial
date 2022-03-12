import multer from "multer";

export const ExcelUploader = multer({
  // write file to upload folder
  dest: "uploads/",
  // only allow files with .xlsx extension
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      return cb(new Error("Only .xlsx files are allowed!"));
    }
    // check mime type
    if (
      file.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return cb(new Error("Only .xlsx files are allowed!"));
    }
    cb(null, true);
  },
  // limit file size to 10Mb
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});
