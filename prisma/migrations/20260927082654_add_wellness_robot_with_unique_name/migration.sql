-- AlterTable
ALTER TABLE "OwnedInventory" ADD COLUMN     "wellnessRobotId" TEXT;

-- CreateTable
CREATE TABLE "WellnessRobot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "robotType" TEXT NOT NULL,
    "targetAudience" TEXT NOT NULL,
    "capabilities" TEXT[],
    "deploymentLocations" TEXT[],
    "deployedCount" INTEGER NOT NULL DEFAULT 0,
    "totalBenefit" INTEGER NOT NULL DEFAULT 0,
    "wellnessImpactScore" DOUBLE PRECISION,
    "lastMaintenanceDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WellnessRobot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WellnessRobot_name_key" ON "WellnessRobot"("name");

-- CreateIndex
CREATE INDEX "WellnessRobot_status_idx" ON "WellnessRobot"("status");

-- CreateIndex
CREATE INDEX "WellnessRobot_targetAudience_idx" ON "WellnessRobot"("targetAudience");

-- CreateIndex
CREATE INDEX "OwnedInventory_wellnessRobotId_idx" ON "OwnedInventory"("wellnessRobotId");

-- AddForeignKey
ALTER TABLE "OwnedInventory" ADD CONSTRAINT "OwnedInventory_wellnessRobotId_fkey" FOREIGN KEY ("wellnessRobotId") REFERENCES "WellnessRobot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
