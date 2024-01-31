// See https://kit.svelte.dev/docs/types#app

import type { ROLE } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			email: string;
			role: ROLE
		};
		type DatabaseSessionAttributes = {};
	}
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
		interface PageState {
			nextPage: string
		}
	}
}

// THIS IS IMPORTANT!!!
export { };
