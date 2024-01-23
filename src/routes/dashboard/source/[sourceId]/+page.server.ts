import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { deleteOneSource, findManyScraper, findOneSource, updateOneSource } from "$lib/server/model";
import { formDataToObject } from "$lib";


export const load: PageServerLoad = async ({ params, locals }) => {

	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");

	const source = await findOneSource(params.sourceId)
	const scrapers = await findManyScraper()
	return {
		userId: session.user.userId,
		email: session.user.email,
		source,
		scrapers
	}
}

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, "/login");
		const sourceId = params.sourceId
		if (!sourceId) {
			return fail(400, {
				message: "No Source Id"
			})
		}

		const formData = await request.formData();
		const convertedObject: any = formDataToObject(formData);
		const { name, image, url, scraper, ...obj } = convertedObject
		if (!name) {
			return fail(400, {
				message: "Name is required"
			})
		}
		if (!image) {
			return fail(400, {
				message: "Image is required"
			})
		}
		if (!url) {
			return fail(400, {
				message: "Url is required"
			})
		}
		try {
			await updateOneSource({
				sourceId,
				name,
				image,
				url,
				data: obj
			})
		} catch (error: any) {
			console.log(error.message)
			return fail(400, {
				message: "Database Error"
			})
		}
		//find scraper


		return {
			message: "Success"
		}
		// exists then update


		// not exists then create
	},
	delete: async ({ locals, params }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, "/login");
		const sourceId = params.sourceId
		if (!sourceId) {
			return fail(400, {
				message: "No Source Id"
			})
		}
		try {
			const res = await findOneSource(sourceId)
			if (!res) {
				return fail(400, {
					message: "Found no source"
				})
			}
			await deleteOneSource(sourceId)
		} catch (error) {
			return fail(500, {
				message: "Something wrong"
			})

		}

		redirect(302, "/dashboard/source")
	}
}
