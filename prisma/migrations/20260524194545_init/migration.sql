-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "trips" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "days" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "tripId" INTEGER NOT NULL,
    CONSTRAINT "days_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "dayId" INTEGER NOT NULL,
    "touristSpotId" INTEGER,
    CONSTRAINT "activities_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "days" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "activities_touristSpotId_fkey" FOREIGN KEY ("touristSpotId") REFERENCES "tourist_spots" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tourist_spots" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "trips_userId_idx" ON "trips"("userId");

-- CreateIndex
CREATE INDEX "days_tripId_idx" ON "days"("tripId");

-- CreateIndex
CREATE INDEX "activities_dayId_idx" ON "activities"("dayId");

-- CreateIndex
CREATE INDEX "activities_touristSpotId_idx" ON "activities"("touristSpotId");
