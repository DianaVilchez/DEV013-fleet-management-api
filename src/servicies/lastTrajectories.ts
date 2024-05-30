import { PrismaClient } from "@prisma/client";
 const prisma = new PrismaClient();

export const lastTrajectoriesDates = async( ) => {

const lastTrajectoriesDates= await prisma.trajectories.groupBy({
    by: ["taxi_id"],
    _max: {
      date: true,
    }
    });
return await Promise.all(
    lastTrajectoriesDates.map(async (item) => {
      const lastTrajectory = await prisma.trajectories.findFirst({
        where: {
          taxi_id: item.taxi_id,
          date: item._max.date,
        },
      });
      console.log(lastTrajectory);
      const taxiDetails = await prisma.taxis.findUnique({
        where: {
          id: item.taxi_id,
        },
      });
      console.log(taxiDetails);
      // Combinar los detalles de la trayectoria y del taxi en un objeto
      return {
        taxiId: item.taxi_id,
        plate: taxiDetails?.plate,
        date: lastTrajectory?.date,
        latitude: lastTrajectory?.latitude,
        longitude: lastTrajectory?.longitude,
      };
    })
  );
}