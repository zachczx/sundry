<script lang="ts">
	import TrackerPage from '$lib/shell/TrackerPage.svelte';

	const options = {
		collectionName: 'gummy',
		labels: {
			pageTitle: 'Elderberry',
			ctaButtonText: 'Ate'
		}
	} satisfies TrackerPageOptions;
</script>

<TrackerPage {options}></TrackerPage>
