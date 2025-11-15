<script lang="ts">
	let {
		notification,
		statusLabels
	}: { notification: NotificationStatus; statusLabels: TrackerStatuses } = $props();
</script>

<div class="flex items-center gap-4">
	{#if notification.level === 'ok'}
		<div class="h-4 w-4 rounded-full bg-lime-500"></div>
		<span class="text-lime-500">{statusLabels.ok}</span>
	{:else if notification.level === 'due'}
		<div class="h-4 w-4 rounded-full bg-orange-400"></div>
		<span class="text-orange-400">{statusLabels.due}</span>
	{:else if notification.level === 'overdue'}
		<div class="h-4 w-4 rounded-full bg-red-700"></div>
		<span class="text-red-700">{statusLabels.overdue}</span>
	{:else}
		<span>Nil</span>
	{/if}
</div>
