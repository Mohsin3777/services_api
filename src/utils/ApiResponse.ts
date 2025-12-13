import { Response } from "express";

export class ApiResponse {
  static success(res: Response, data: any) {
    return res.status(200).json({ success: true, data });
  }

  static created(res: Response, message: string, data?: any) {
    return res.status(201).json({ success: true, message, data });
  }

  static badRequest(res: Response, message: string) {
    return res.status(400).json({ success: false, message });
  }

    // Update specific responses
  static updated(res: Response, message: string, data?: any) {
    return res.status(200).json({ success: true, message, data });
  }

  static conflict(res: Response, message: string) {
    return res.status(409).json({ success: false, message });
  }

  static error(res: Response, message: string, error: any) {
    return res.status(500).json({
      success: false,
      message,
      error: error instanceof Error ? error.message : error
    });
  }
}
