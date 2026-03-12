import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { ParseError } from '../types';
import { logger } from '../utils/logger';

const SUPPORTED_MIMETYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};

export async function parseResume(buffer: Buffer, mimetype: string): Promise<string> {
  const fileType = SUPPORTED_MIMETYPES[mimetype];

  if (!fileType) {
    throw new ParseError(
      `Unsupported file type: ${mimetype}. Only PDF and DOCX files are supported.`,
    );
  }

  logger.info({ mimetype, fileType, bufferSize: buffer.length }, 'Parsing resume');

  try {
    let text: string;

    if (fileType === 'pdf') {
      text = await parsePdf(buffer);
    } else {
      text = await parseDocx(buffer);
    }

    // Clean up extracted text
    text = cleanText(text);

    if (!text || text.trim().length < 50) {
      throw new ParseError(
        'Could not extract meaningful text from the resume. The file may be image-based (scanned) or empty. Please upload a text-based PDF or DOCX file.',
      );
    }

    logger.info({ extractedLength: text.length }, 'Resume parsed successfully');
    return text;
  } catch (error) {
    if (error instanceof ParseError) throw error;

    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error({ error: message }, 'Failed to parse resume');

    if (message.includes('encrypt') || message.includes('password')) {
      throw new ParseError('The PDF file is password-protected. Please upload an unprotected file.');
    }

    throw new ParseError(`Failed to parse resume: ${message}`);
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
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/ {3,}/g, '  ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
