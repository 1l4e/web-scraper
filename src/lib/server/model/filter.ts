import prisma from "../prisma";

export async function findManyFilter(active?: boolean) {
    return await prisma.filter.findMany({
        where: {
            active: active
        }
    })
}

export async function findOneFilter(id: string) {
    return await prisma.filter.findFirst({
        where: {
            type: id
        }
    })
}
