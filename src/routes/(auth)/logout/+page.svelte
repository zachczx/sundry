<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';
	import { onMount } from 'svelte';

	onMount(async () => {
		await pb.authStore.clear();

		goto('/login');
	});
</script>
