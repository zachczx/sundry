<script lang="ts">
	import TrackerPage from '$lib/shell/TrackerPage.svelte';

	const options = {
		collectionName: 'spray',
		labels: {
			pageTitle: 'Spray',
			ctaButtonText: 'Sprayed'
		}
	} satisfies TrackerPageOptions;
</script>

<TrackerPage {options}></TrackerPage>
