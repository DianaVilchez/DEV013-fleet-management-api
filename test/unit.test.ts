
import { /*getDataTaxis,*/ getAllTaxis } from "../src/controllers/taxis";
import { Request, Response } from 'express';
// import prisma from "../src/controllers/taxis"

jest.mock('@prisma/client', () => {
    const mockFindMany = jest.fn().mockResolvedValue([
        { id: 10133, plate: "PAOF-6727" },
        { id: 7249, plate: "CNCJ-2997" },
        { id: 2210, plate: "FGMG-3071" },
    ]);

    return {
        PrismaClient: jest.fn(() => ({
            taxis: {
                findMany: mockFindMany
            }
        }))
    };
});
    // return {
    //     PrismaClient :jest.fn(() => mockFindMany)
    // }
    // __esModule: true,
    // default: {
    //     taxis: {
    //         findMany: jest.fn(), // Configura el mock de findMany
    //     }
    // }


// const findMany =  jest.fn().mockResolvedValue([
//     { id:10133 , plate:"PAOF-6727"},
//     { id:7249 , plate:"CNCJ-2997"},
//     { id:2210 , plate:"FGMG-3071"},
// ])
// class prismaMock  {
//     taxis = {
//         findMany
//     }
// };
// jest.mock('@prisma/client',() => ({
//     PrismaClient : prismaMock
// }))


describe('getAllTaxis',() => {
    it('should return list of taxis' , async () => {
        // const mockFindMany = jest.fn().mockResolvedValue([
        //     { id: 10133, plate: "PAOF-6727" },
        //     { id: 7249, plate: "CNCJ-2997" },
        //     { id: 2210, plate: "FGMG-3071" },
        // ]);

// (prisma.taxis.findMany as jest.Mock).mockImplementation(mockFindMany);
        //creamos req y res simulados que aun no se usen las funcion los espera
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        // const listTaxis = await getDataTaxis(req,res);
        // expect(listTaxis).toEqual([
        //     { id:10133 , plate:"PAOF-6727"},
        //     { id:7249 , plate:"CNCJ-2997"},
        //     { id:2210 , plate:"FGMG-3071"},
        // ])

        await getAllTaxis(req,res);

    // expect(mockFindMany.taxis.findMany).toHaveBeenCalledWith({
    //     select:{
    //         id:true,
    //         plate:true,
    //     }
    // })
    expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data: [
                { id: 10133, plate: "PAOF-6727" },
                { id: 7249, plate: "CNCJ-2997" },
                { id: 2210, plate: "FGMG-3071" },
            ],
            // nextCursor: 296,
            limit: 10
            
        });
    })
})


