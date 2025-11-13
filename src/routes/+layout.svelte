<script lang="ts">
	import ArkToaster from '$lib/ui/ArkToaster.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { onNavigate } from '$app/navigation';
	import { topLevelRoutes } from '$lib/shell/nav';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		let direction = 'forward';

		const fromIndex = topLevelRoutes.findIndex(
			(route) => route.href === navigation.from?.url.pathname
		);
		const toIndex = topLevelRoutes.findIndex((route) => route.href === navigation.to?.url.pathname);

		if (fromIndex && toIndex) {
			// Bottom navbar

			if (toIndex < fromIndex) {
				direction = 'back';
			}
		} else {
			// 2nd level routes
			const fromId = navigation.from?.route.id;
			const toId = navigation.to?.route.id;

			const fromLevel = fromId?.split('/');
			const toLevel = toId?.split('/');

			if (fromLevel && toLevel) {
				if (fromLevel.length > toLevel.length) {
					direction = 'back';
				}
			}
		}

		document.documentElement.dataset.direction = direction;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
	const queryClient = new QueryClient();

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	<ArkToaster />
	{@render children()}
</QueryClientProvider>
