<script lang="ts">
	import { calculateRecordsGapsWithVacation } from '$lib/overlap';
	import TrackerPage from '$lib/shell/TrackerPage.svelte';

	const options = {
		collectionName: 'towel',
		labels: {
			pageTitle: 'Towel',
			ctaButtonText: 'Washed'
		},
		calculateGaps: calculateRecordsGapsWithVacation
	} satisfies TrackerPageOptions;
</script>

<TrackerPage {options}></TrackerPage>
