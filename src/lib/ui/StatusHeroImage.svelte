<script lang="ts">
	import hero from '$lib/assets/hero.webp?w=600&enhanced';
	import AntDesignExclamationCircleFilled from '$lib/assets/svg/AntDesignExclamationCircleFilled.svelte';
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import MaterialSymbolsCheckCircle from '$lib/assets/svg/MaterialSymbolsCheckCircle.svelte';
	let { notification }: { notification: NotificationStatus } = $props();
</script>

{#if notification}
	<div class="avatar relative mt-2 mb-4">
		<div class="w-40 rounded-full shadow-md">
			<enhanced:img
				src={hero}
				alt="hero"
				class={[status === 'orange' && 'saturate-75', status === 'red' && 'saturate-50']}
			/>
		</div>
		<div
			class="bg-base-100 absolute top-2 -right-4 flex size-14 items-center justify-center rounded-full"
		>
			{#if notification.level === 'ok'}
				<MaterialSymbolsCheckCircle class="text-success size-13" />
			{:else if notification.level === 'due'}
				<AntDesignExclamationCircleFilled class="text-warning size-13" />
			{:else if notification.level === 'overdue'}
				<AntDesignExclamationCircleFilled class="text-error size-13" />
			{/if}
		</div>
	</div>
{:else}
	<EmptyState class="text-primary/30 my-4" />
{/if}
