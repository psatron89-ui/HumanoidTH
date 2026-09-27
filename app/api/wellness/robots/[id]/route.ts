import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const robot = await prisma.wellnessRobot.findUnique({
      where: { id },
      include: {
        inventory: true,
      },
    });

    if (!robot) {
      return NextResponse.json(
        { error: 'Robot not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(robot);
  } catch (error) {
    console.error('Error fetching wellness robot:', error);
    return NextResponse.json(
      { error: 'Failed to fetch robot' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const robot = await prisma.wellnessRobot.update({
      where: { id },
      data: {
        ...body,
      },
      include: {
        inventory: true,
      },
    });

    return NextResponse.json(robot);
  } catch (error) {
    console.error('Error updating wellness robot:', error);
    return NextResponse.json(
      { error: 'Failed to update robot' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.wellnessRobot.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Robot deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting wellness robot:', error);
    return NextResponse.json(
      { error: 'Failed to delete robot' },
      { status: 500 }
    );
  }
}
