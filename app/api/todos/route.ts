import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Todo, { ITodo } from '@/models/Todo';

export async function GET() {
  await dbConnect();

  try {
    const todos: ITodo[] = await Todo.find({});
    return NextResponse.json({ success: true, data: todos });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  await dbConnect();

  try {
    const todo: ITodo = await Todo.create(body);
    return NextResponse.json({ success: true, data: todo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
