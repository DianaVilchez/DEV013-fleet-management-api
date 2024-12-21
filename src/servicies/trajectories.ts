import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
export const trajectoriesData = async (
  startIndex: number,
  limit: number,
  taxi_id?: number,
  startOfDay?: Date,
  endOfDay?: Date,
) => {
  return await prisma.trajectories.findMany({
    where: {
      ...(taxi_id && { taxi_id }), // Se aplica solo si taxi_id existe
      ...(startOfDay && endOfDay && {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      }),
    },
    skip: startIndex,
    take: limit,
    orderBy: { id: "asc" },
  });
};
