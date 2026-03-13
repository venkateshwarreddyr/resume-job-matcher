import { NextResponse } from "next/server";
import { parseResume } from "@/lib/parser";
import { analyzeWithAI } from "@/lib/ai";

const ALLOWED_MIMETYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    // Validate file presence
    if (!file || !(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Resume file is required. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIMETYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only PDF and DOCX files are accepted.",
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit." },
        { status: 400 }
      );
    }

    // Validate job description
    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    if (jobDescription.length < 50) {
      return NextResponse.json(
        {
          error: "Job description must be at least 50 characters long.",
        },
        { status: 400 }
      );
    }

    if (jobDescription.length > 10000) {
      return NextResponse.json(
        {
          error: "Job description must not exceed 10,000 characters.",
        },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse resume
    let resumeText: string;
    try {
      resumeText = await parseResume(buffer, file.type);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to parse resume.";
      return NextResponse.json({ error: message }, { status: 422 });
    }

    // Analyze with AI
    try {
      const result = await analyzeWithAI(resumeText, jobDescription);
      return NextResponse.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "AI analysis failed.";

      // Check for rate limiting
      if (message.includes("rate") || message.includes("429")) {
        return NextResponse.json(
          {
            error:
              "Rate limit exceeded. Please wait a moment and try again.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
