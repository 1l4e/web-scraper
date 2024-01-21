
import { redirect, type Actions, fail } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { formDataToObject } from "$lib";
import { createOneSource, findManyScraper } from "$lib/server/model";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
	const scrapers = await findManyScraper()
	return {
		userId: session.user.userId,
		email: session.user.email,
		scrapers
	};
};


export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, "/login");

		const formData = await request.formData();
		const convertedObject: any = formDataToObject(formData);
		const { name, image, url, ...obj } = convertedObject
		// console.log({ name, image, url, obj })
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
			await createOneSource({
				name,
				image,
				url,
				data: obj
			})

		} catch (error) {
			// console.log(error)
			return fail(400, {
				message: "Database Error"
			})

		}

	}
}
