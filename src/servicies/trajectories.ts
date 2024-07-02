 import { PrismaClient } from "@prisma/client";
 const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
 export const trajectoriesData = async (taxi_id: number, startOfDay: Date, endOfDay: Date, startIndex: number, limit: number)=>{

  return await prisma.trajectories.findMany({
    where:{
      date:{
        gte: startOfDay,
        lt: endOfDay,
      },
      taxi_id:taxi_id,
    },
    skip: startIndex,
    take: limit,
    orderBy: { id: "asc" },
  });
}