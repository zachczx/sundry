<script lang="ts">
	import MaterialSymbolsArrowRightAlt from '$lib/assets/svg/MaterialSymbolsArrowRightAlt.svelte';
	import MaterialSymbolsCheckCircle from '$lib/assets/svg/MaterialSymbolsCheckCircle.svelte';
	import MaterialSymbolsFilterList from '$lib/assets/svg/MaterialSymbolsFilterList.svelte';
	import MaterialSymbolsHistory from '$lib/assets/svg/MaterialSymbolsHistory.svelte';
	import { pb } from '$lib/pb';
	import {
		allLogsRefetchOptions,
		allTrackersQueryOptions,
		allTrackersRefetchOptions,
		feedQueryOptions
	} from '$lib/queries';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { addToast } from './ArkToaster.svelte';

	dayjs.extend(relativeTime);

	const trackersDb = createQuery(allTrackersQueryOptions);

	const tanstackClient = useQueryClient();

	async function checkHandler(tracker: TrackerDB) {
		try {
			console.log(tracker.show);

			await pb.collection('trackers').update(tracker.id, { show: tracker.show });

			await tanstackClient.refetchQueries(allTrackersRefetchOptions());
			await tanstackClient.refetchQueries(allLogsRefetchOptions());
		} catch {
			addToast('error', 'Error toggling filter!');
		}
	}
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="btn btn-ghost drawer-button px-2 py-0">
		<MaterialSymbolsFilterList class="size-6" />
	</div>
	<ul
		class="dropdown-content menu rounded-box bg-base-100 text-md text-base-content z-1 w-72 p-2 shadow-lg"
	>
		<li class="mb-2 px-3 py-2 font-bold">Show/Hide Trackers</li>
		{#each trackersDb.data as tracker (tracker.id)}
			<li>
				<label class="flex w-full items-center py-2"
					><div class="grow">{tracker.display}</div>
					<input
						type="checkbox"
						class="toggle toggle-sm toggle-success"
						bind:checked={tracker.show}
						onchange={() => checkHandler(tracker)}
					/></label
				>
			</li>
		{/each}
	</ul>
</div>
