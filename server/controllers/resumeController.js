import Resume from "../models/Resume.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";

// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const user = req.userId;
        const { title } = req.body;

        if(!title) return res.status(400).json({ message: "Title is required" });

        const newResume = await Resume.create({ userId: user, title });

        return res.status(201).json({ message: "Resume created successfully", resume: newResume });
    } catch (error) {
        return res.status(400).json({ message: "Error creating resume", error: error.message });
    }
}

// DELETE: /api/resumes/delete/:resumeId
export const deleteResume = async (req, res) => {
    try {
        const user = req.userId;
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ userId: user, _id: resumeId });

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Error deleting resume", error: error.message });
    }
}

// GET: /api/resumes/get/:resumeId
export const getResumeById = async (req, res) => {
    try {
        const user = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId: user, _id: resumeId });  // <-- fixed missing variable
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        resume.__V = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: "Error fetching resume by id", error: error.message });
    }
}

// GET: /api/resumes/public/:resumeId
export const getResumePublicById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) return res.status(404).json({ message: "Resume not found" });

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: "Error fetching public resume", error: error.message });
    }
}

// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const user = req.userId;
    const { resumeId, resumeData } = req.body;
    const removeBackground = req.body.removeBackground === "yes";
    const image = req.file;

    let resumeDataCopy =
      typeof resumeData === "string"
        ? JSON.parse(resumeData)
        : structuredClone(resumeData);

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

        const transformPre =
       "h-300,w-300,z-0.75" +
       (removeBackground ? ",e-bgremove" : "");


     const response = await imagekit.files.upload({
         file: imageBufferData,
         fileName: "resume.png",
         folder: "user-resumes",
         useUniqueFileName: true,
         transformation: {
         pre: transformPre,
       },
     });

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId: user, _id: resumeId },
      { $set: resumeDataCopy },
      { new: true }
    );

    return res.status(200).json({
      message: "Save successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error save resume",
      error: error.message,
    });
  }
};
