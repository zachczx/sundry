<script lang="ts">
	import { calculateRecordsGapsWithVacation } from '$lib/overlap';
	import { createDoggoChewableQueryOptions, createDoggoChewableRefetchOptions } from '$lib/queries';
	import TrackerPage from '$lib/shell/TrackerPage.svelte';

	const options = {
		collectionName: 'doggoChewable',
		labels: {
			pageTitle: 'Chewable',
			statusLabels: { ok: 'Fed', due: 'Due', overdue: 'Overdue' },
			ctaButtonText: 'Fed'
		},
		queries: {
			query: createDoggoChewableQueryOptions,
			refetch: createDoggoChewableRefetchOptions
		},
		calculateGaps: calculateRecordsGapsWithVacation
	} satisfies TrackerPageOptions;
</script>

<TrackerPage {options}></TrackerPage>
