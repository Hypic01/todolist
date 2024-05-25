import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Todo, { ITodo } from '@/models/Todo';

export async function PUT(req: NextRequest, { params }: { params: { item: string } }) {
  const { item } = params; // Extract the item from params
  const body = await req.json();
  await dbConnect();

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(item, body, { new: true, runValidators: true });
    if (!updatedTodo) {
      return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedTodo });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error updating todo' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { item: string } }) {
  const { item } = params; // Extract the item from params
  await dbConnect();

  try {
    const deletedTodo = await Todo.findByIdAndDelete(item);
    if (!deletedTodo) {
      return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ success: false, message: 'Error deleting todo' }, { status: 400 });
  }
}
