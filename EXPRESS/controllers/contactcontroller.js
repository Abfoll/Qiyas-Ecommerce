import ContactMessage from "../models/contactmessage.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";

// @route   POST /api/contact
// @access  Public
export const submitMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  return ApiResponse.success(res, {
    statusCode: 201,
    message: 'Your message has been received. We will get back to you soon.',
    data: { message },
  });
});

// @route   GET /api/contact
// @access  Private/Admin
export const getMessages = asyncHandler(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const messages = await ContactMessage.find(filter).sort('-createdAt');
  return ApiResponse.success(res, { data: { messages } });
});

// @route   GET /api/contact/:id
// @access  Private/Admin
export const getMessageById = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status: 'read' },
    { new: true }
  );
  if (!message) throw new ApiError(404, 'Message not found');
  return ApiResponse.success(res, { data: { message } });
});

// @route   PATCH /api/contact/:id/status
// @access  Private/Admin
export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!message) throw new ApiError(404, 'Message not found');
  return ApiResponse.success(res, { message: 'Status updated', data: { message } });
});

// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found');
  return ApiResponse.success(res, { message: 'Message deleted' });
});

export default {
  submitMessage,
  getMessages,
  getMessageById,
  updateStatus,
  deleteMessage
};