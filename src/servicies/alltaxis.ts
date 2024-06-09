import { PrismaClient } from "@prisma/client"

export const allTaxisData = async(prisma:PrismaClient,startIndex: number, limit: number) => {
return await prisma.taxis.findMany({
    skip: startIndex,
    take:limit,
    orderBy: {
        id: 'asc' // Asegúrate de que los resultados estén ordenados
    },
})
}