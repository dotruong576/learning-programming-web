import mongoose from 'mongoose';
import { TCommentsDocument } from '../types/documentTypes';

const { Schema } = mongoose;

const commentsSchema = new Schema<TCommentsDocument>(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: { type: Number, default: 0 },
    likedUsers: {
      type: [String],
      required: true,
      default: [],
    },
    unlikedUsers: {
      type: [String],
      required: true,
      default: [],
    },
    replies: {
      type: [String],
      required: true,
      default: [],
    },
    isReply: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

const CommentsModel = mongoose.model<TCommentsDocument>('Comments', commentsSchema, 'Comments');

export default CommentsModel;
