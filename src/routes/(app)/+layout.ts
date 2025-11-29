import { pb } from '$lib/pb';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async () => {
	if (!pb.authStore.isValid || !pb.authStore.record) {
		redirect(307, '/login');
	}

	const userId = pb.authStore.record.id;
	const currentFamilyId = pb.authStore.record.family;

	try {
		await pb.collection('families').getOne(currentFamilyId);
	} catch {
		console.log('User is homeless. Attempting self-healing...');
		await healHomelessUser(userId);
	}
};

async function healHomelessUser(userId: string) {
	try {
		const myArchived = await pb.collection('families').getFirstListItem(`owner="${userId}"`);

		await pb.collection('families').update(myArchived.id, {
			enabled: true
		});
	} catch {
		error(500);
	}
}
