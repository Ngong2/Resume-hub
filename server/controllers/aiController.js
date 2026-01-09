import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// =======================================
// ENHANCE PROFESSIONAL SUMMARY
// POST: /api/ai/enhance-pro-sum
// =======================================

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Please provide content to enhance",
      });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are a professional resume writer and ATS optimization expert.
Rewrite the user's content into ONE concise, polished professional summary.
Requirements:
- 1–2 sentences only
- Formal, professional, and executive tone
- ATS-friendly keywords
- Use strong action verbs
- Include measurable experience or impact when possible
- Do NOT provide options, explanations, headings, bullet points, or commentary
- Output ONLY the final enhanced summary text
          `.trim(),
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.4,
    });

    return res.status(200).json({
      enhancedContent: response.choices[0].message.content.trim(),
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error enhancing professional summary",
      error: error.message,
    });
  }
};



// =======================================
// UPLOAD RESUME & EXTRACT DATA
// POST: /api/ai/upload-resume
// =======================================

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText || !title) {
            return res.status(400).json({
                message: "Resume text and title are required"
            });
        }

        const systemPrompt =
            "You are an expert AI Agent that extracts structured resume data.";

        const userPrompt = `
Extract structured resume data from the following resume text.

Return ONLY valid JSON in this exact structure (no explanations, no markdown):

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "description": "",
      "gpa": ""
    }
  ]
}

Resume Text:
${resumeText}
`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        });

        return res.status(201).json({
            resumeId: newResume._id
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Error uploading resume",
            error: error.message
        });
    }
};

/// =======================================
// ENHANCE JOB DESCRIPTION
// POST: /api/ai/enhance-job-desc
// =======================================

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body

    if (!userContent) {
      return res.status(400).json({
        message: "Please provide content to enhance"
      })
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are a professional resume writer and ATS optimization expert.

Rewrite the user's content into ONE concise, high-impact EXPERIENCE summary for an experienced candidate.

STRICT REQUIREMENTS:
- 3–5sentences ONLY
- Formal, professional, executive tone
- ATS-optimized keywords
- Strong action verbs
- Highlight years of experience, core responsibilities, and measurable impact where possible
- No bullet points
- No headings
- No explanations or commentary
- Output ONLY the final enhanced experience text
          `.trim()
        },,
        {
          role: "user",
          content: userContent
        }
      ],
      temperature: 0.3
    })

    return res.status(200).json({
      enhancedContent: response.choices[0].message.content.trim()
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error enhancing job description",
      error: error.message
    })
  }
}
