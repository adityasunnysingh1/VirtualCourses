import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import https from "https";
import os from "os";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

// Helper: Download File from Cloudinary to Local Temp 
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete temp file on error
      reject(err.message);
    });
  });
};

export const searchWithAi = async(req,res)=>{
   try {
    const {input} = req.body;
    if(!input){
        return res.status(400).json({message:"Search Query is required"})
    }
    const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
    const prompt = `You are an intelligent assistant for an
LMS platform. A user will type any query about what they
want to learn. Your task is to understand the intent and
return one ** most relevant keyword ** from the following
list of course categories and levels:

- App Development
- AI/ML
- AI Tools
- Data Science
- Data Analytics
- Ethical Hacking
- UI UX Designing
- Web Development
- Others
- Beginner
- Intermediate
- Advanced

Only reply with one single keyword from the list above that best
matches the query. Do not explain anything. No extra text.

Query: ${input}`;

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
   });
   const keyword = response.text ? response.text() : response.text;
   const courses = await Course.find({
        isPublished:true,
        $or:[
            {title:{$regex:input, $options:"i"}},
            {subTitle: {$regex:input,$options:"i"}},
            {description:{$regex:input,$options:"i"}},
            {category:{$regex:input,$options:"i"}},
            {level:{$regex:input,$options:"i"}}
        ]
    });
    if(courses.length > 0){
      return res.status(200).json(courses)
    }
    else{
        const courses = await Course.find({
        isPublished:true,
        $or:[
            {title:{$regex:keyword, $options:"i"}},
            {subTitle: {$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}},
            {category:{$regex:keyword,$options:"i"}},
            {level:{$regex:keyword,$options:"i"}}
        ]
    });
    return res.status(200).json(courses)
    }
    
   } catch (error) {
    return res.status(500).json({message:`Failed to search ${error.message}`})
   }
}

export const explainLecture = async (req, res) => {
    try {
      const { lectureId, currentTimestamp, userQuestion } = req.body;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      if (!lectureId) {
        return res.status(400).json({ message: "Lecture ID is required" });
      }
  
      // 1. Fetch Lecture
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) return res.status(404).json({ message: "Lecture not found" });
  
      let transcriptText = lecture.transcript;
  
      // 2. AUTO-GENERATE TRANSCRIPT (If missing)
      // This runs ONLY the first time a user asks a question on a new video
      if (!transcriptText || transcriptText.length < 50) {
          console.log("⚠️ Transcript missing. Generating from Cloudinary video...");
          
          // A. Define Temp Path
          const tempFilePath = path.join(os.tmpdir(), `lecture-${lectureId}.mp4`);
          
          try {
              // B. Download from Cloudinary
              await downloadFile(lecture.videoUrl, tempFilePath);
              
              // C. Upload to Google AI
              const uploadResult = await fileManager.uploadFile(tempFilePath, {
                  mimeType: "video/mp4",
                  displayName: `Lecture ${lectureId}`,
              });
              
              // D. Wait for processing (Video takes a moment)
              let file = await fileManager.getFile(uploadResult.file.name);
              while (file.state === "PROCESSING") {
                  process.stdout.write(".");
                  await new Promise((resolve) => setTimeout(resolve, 2000)); // Sleep 2s
                  file = await fileManager.getFile(uploadResult.file.name);
              }

              if (file.state === "FAILED") {
                  throw new Error("Video processing failed by Google AI");
              }

              // E. Ask Gemini to Transcribe
              const result = await model.generateContent([
                  {
                      fileData: {
                          mimeType: uploadResult.file.mimeType,
                          fileUri: uploadResult.file.uri
                      }
                  },
                  { text: "Generate a detailed transcript of the spoken audio in this video. Ignore background noise." }
              ]);

              transcriptText = result.response.text();

              // F. Save to Database (Permanent Cache)
              lecture.transcript = transcriptText;
              await lecture.save();
              console.log("✅ Transcript generated and saved to DB.");

              // G. Cleanup (Delete temp files)
              fs.unlinkSync(tempFilePath);
              await fileManager.deleteFile(uploadResult.file.name);

          } catch (error) {
              console.error("Transcription Failed:", error);
              // Clean up temp file if it exists
              if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
              
              // If transcription fails, we can't context-answer, so we fallback
              return res.status(200).json({ 
                  success: true, 
                  answer: "I am analyzing the video content for the first time, but something went wrong generating the transcript. Please try again in a moment." 
              });
          }
      }
  
      // 3. Answer the Question using the Transcript
      const prompt = `
        You are an expert coding tutor.
        
        --- TRANSCRIPT START ---
        ${transcriptText}
        --- TRANSCRIPT END ---
        
        CONTEXT:
        The student paused the video at timestamp: ${currentTimestamp} seconds.
        
        STUDENT QUESTION: "${userQuestion || "Explain the concept being discussed right now."}"
        
        INSTRUCTIONS:
        1. Answer strictly based on the provided transcript.
        2. Identify what topic falls around the ${currentTimestamp} second mark (estimate based on word count/flow if needed).
        3. Keep the explanation clear and short (max 3 sentences).
      `;
  
      const response = await model.generateContent(prompt);
      const answer = response.response.text();
  
      return res.status(200).json({ 
        success: true, 
        answer: answer 
      });
  
    } catch (error) {
      console.error("AI Context Error:", error);
      return res.status(500).json({ message: "Failed to generate explanation" });
    }
};