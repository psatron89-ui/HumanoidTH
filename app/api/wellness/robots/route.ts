import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const robots = await prisma.wellnessRobot.findMany({
      include: {
        inventory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(robots);
  } catch (error) {
    console.error('Error fetching wellness robots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch robots' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      manufacturer,
      model,
      robotType,
      targetAudience,
      capabilities,
      deploymentLocations,
      deployedCount,
      totalBenefit,
      wellnessImpactScore,
      status,
    } = body;

    if (!name || !manufacturer || !model || !robotType || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const robot = await prisma.wellnessRobot.create({
      data: {
        name,
        manufacturer,
        model,
        robotType,
        targetAudience,
        capabilities: capabilities || [],
        deploymentLocations: deploymentLocations || [],
        deployedCount: deployedCount || 0,
        totalBenefit: totalBenefit || 0,
        wellnessImpactScore: wellnessImpactScore || null,
        status: status || 'Active',
      },
      include: {
        inventory: true,
      },
    });

    return NextResponse.json(robot, { status: 201 });
  } catch (error) {
    console.error('Error creating wellness robot:', error);
    return NextResponse.json(
      { error: 'Failed to create robot' },
      { status: 500 }
    );
  }
}
