import mongoose, { Document, Model } from 'mongoose';

// Define the interface for a Todo document
export interface ITodo extends Document {
  text: string;
  completed: boolean;
}

// Define the schema for a Todo document
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Export the Todo model
export default (mongoose.models.Todo as Model<ITodo>) || mongoose.model<ITodo>('Todo', TodoSchema);
