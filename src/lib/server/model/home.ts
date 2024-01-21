import { findManyCategories } from "../model";


export async function findOneHome({ sourceId, options }: { sourceId: string, options: any }) {
    return findManyCategories()
}
