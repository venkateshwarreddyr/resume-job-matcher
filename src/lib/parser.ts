import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const SUPPORTED_MIMETYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

export async function parseResume(
  buffer: Buffer,
  mimetype: string
): Promise<string> {
  const fileType = SUPPORTED_MIMETYPES[mimetype];

  if (!fileType) {
    throw new Error(
      `Unsupported file type: ${mimetype}. Only PDF and DOCX files are supported.`
    );
  }

  try {
    let text: string;

    if (fileType === "pdf") {
      text = await parsePdf(buffer);
    } else {
      text = await parseDocx(buffer);
    }

    // Clean up extracted text
    text = cleanText(text);

    if (!text || text.trim().length < 50) {
      throw new Error(
        "Could not extract meaningful text from the resume. The file may be image-based (scanned) or empty. Please upload a text-based PDF or DOCX file."
      );
    }

    return text;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("encrypt") ||
        error.message.includes("password")
      ) {
        throw new Error(
          "The PDF file is password-protected. Please upload an unprotected file."
        );
      }
      throw error;
    }
    throw new Error("Failed to parse resume: Unknown error");
  }
}

async function parsePdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

async function parseDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
