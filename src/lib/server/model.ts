import prisma from "./prisma"


export const activeOneSource = async ({ sourceId, active }: { sourceId: string, active: boolean }) => {
    await prisma.source.update({
        where: {
            id: sourceId
        },
        data: {
            active
        }
    })
}

export const updateOneSource = async ({ sourceId, name, image, url, data }: CreateOneObject & { sourceId: string }) => {
    await prisma.source.update({
        where: {
            id: sourceId
        },
        data: {
            name,
            image,
            url,
            scraper: {
                upsert: {
                    create: {
                        name,
                        data
                    },
                    update: {
                        name,
                        data
                    }
                }
            }
        }
    })

}
export const createOneSource = async ({ name, image, url, data }: CreateOneObject) => {
    await prisma.source.create({
        data: {
            name,
            image,
            url,
            scraper: {
                create: {
                    name,
                    data
                }
            }
        }
    })

}

export const findOneSource = async (id: string) => {
    return await prisma.source.findFirst({
        where: {
            id
        },
        include: {
            scraper: true
        }
    })
}

export const deleteOneSource = async (id: string) => {
    return await prisma.source.delete({
        where: {
            id
        }
    })
}

export const findManySourcesNoScraper = async (active?: boolean) => {
    return await prisma.source.findMany({
        where: {
            active: active
        },
        select: {
            id: true,
            name: true,
            image: true,
            url: true
        }
    })
}
export const findManySources = async (active?: boolean) => {
    return await prisma.source.findMany({
        where: {
            active: active
        },
        include: {
            scraper: true
        }
    })
}

export const findManyScraper = async () => {
    return await prisma.scraper.findMany({
        orderBy: {
            id: 'asc'
        }
    })
}

export const findManyCategories = ({ sourceId, page }: { sourceId?: string, page?: string }) => {
    return null
}

// export const findManyCategories = () => {
//     return [
//         {
//             id: 1,
//             name: 'Phim moi',
//             slug: '/phim-moi',
//             children: [
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoiyyy.net/wp-content/uploads/2020/12/Sweet-Home-2.jpg',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoiyyy.net/wp-content/uploads/2020/12/Sweet-Home-2.jpg',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 1,
//             name: 'Phim moi',
//             slug: '/phim-moi',
//             children: [
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 1,
//             name: 'Phim moi',
//             slug: '/phim-moi',
//             children: [
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 1,
//             name: 'Phim moi',
//             slug: '/phim-moi',
//             children: [
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 1,
//             name: 'Phim moi',
//             slug: '/phim-moi',
//             children: [
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 },
//
//                 {
//                     id: 11,
//                     name: 'Phim 1',
//                     slug: '/phim-1',
//                     image: 'https://phimmoichill1.net/wp-content/uploads/2023/08/Phimmoichill.png',
//                     children: [
//                         { id: 111, name: 'Tap 1', slug: '/phim-1.1' },
//                         { id: 112, name: 'Tap 2', slug: '/phim-1.2' },
//                         { id: 113, name: 'Tap 3', slug: '/phim-1.2' },
//                         { id: 114, name: 'Tap 4', slug: '/phim-1.2' },
//                         { id: 115, name: 'Tap 5', slug: '/phim-1.2' }
//                     ]
//                 }
//             ]
//         },
//
//     ]
// }

type CreateOneObject = {
    name: string
    url: string
    image: string
    data: any
}
