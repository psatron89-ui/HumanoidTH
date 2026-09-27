import { createSeedClient, seedAtlasData } from "../lib/seed-importer";

const prisma = createSeedClient();

async function seedWellnessRobots() {
  const robots = [
    {
      name: "PAL (Personalized Ambient Living)",
      manufacturer: "Pal Robotics (Thailand)",
      model: "PAL 3",
      robotType: "Companion Robot",
      targetAudience: "Elderly Care",
      capabilities: ["Medication Reminder", "Fall Detection", "Social Interaction", "Activity Monitoring"],
      deploymentLocations: ["Bangkok Metropolitan Hospital", "Chiang Mai Senior Center", "Phuket Wellness Home"],
      deployedCount: 12,
      totalBenefit: 450,
      wellnessImpactScore: 4.5,
      status: "Active",
    },
    {
      name: "Zenbo",
      manufacturer: "ASUS (Thailand)",
      model: "ZenboJunior",
      robotType: "Family Robot",
      targetAudience: "Rehabilitation",
      capabilities: ["Physical Therapy Assistant", "Posture Correction", "Voice Commands", "Interactive Games"],
      deploymentLocations: ["Bangkok Rehabilitation Institute", "Rayong Physical Therapy Center"],
      deployedCount: 8,
      totalBenefit: 280,
      wellnessImpactScore: 4.2,
      status: "Active",
    },
    {
      name: "JIBO",
      manufacturer: "Jibo Inc. (Thailand Distribution)",
      model: "JIBO-1",
      robotType: "Social Robot",
      targetAudience: "Mental Health",
      capabilities: ["Emotional Support", "Conversation", "Entertainment", "Cognitive Exercises"],
      deploymentLocations: ["Bangkok Mental Health Center", "Chiang Mai Wellness Clinic"],
      deployedCount: 6,
      totalBenefit: 210,
      wellnessImpactScore: 4.0,
      status: "Testing",
    },
    {
      name: "RIBA2",
      manufacturer: "Sumitomo Riken (Thailand)",
      model: "RIBA-II",
      robotType: "Physical Assistant",
      targetAudience: "Elderly Care",
      capabilities: ["Patient Lifting", "Mobility Support", "Strength Training", "Balance Assistance"],
      deploymentLocations: ["Bangkok Central Hospital", "Udon Thani Regional Hospital"],
      deployedCount: 4,
      totalBenefit: 150,
      wellnessImpactScore: 4.7,
      status: "Active",
    },
    {
      name: "PARO (Therapeutic Robot Seal)",
      manufacturer: "National Institute of Advanced Industrial Science and Technology",
      model: "PARO SE",
      robotType: "Therapy Robot",
      targetAudience: "Mental Health & Elderly Care",
      capabilities: ["Emotional Comfort", "Stress Reduction", "Social Engagement", "Behavioral Support"],
      deploymentLocations: ["Bangkok Senior Living Community", "Nakhon Ratchasima Care Home"],
      deployedCount: 10,
      totalBenefit: 320,
      wellnessImpactScore: 4.6,
      status: "Active",
    },
  ];

  for (const robot of robots) {
    await prisma.wellnessRobot.upsert({
      where: { name: robot.name },
      update: robot,
      create: robot,
    });
  }

  console.log("✅ Wellness robots seeded successfully");
}

seedAtlasData(prisma)
  .then(() => seedWellnessRobots())
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
