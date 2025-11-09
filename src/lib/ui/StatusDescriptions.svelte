<script lang="ts">
	let {
		notification,
		descriptions
	}: { notification: NotificationStatus; descriptions: StatusDescriptions } = $props();
</script>

{#if notification.level === 'ok'}
	<div class="hidden h-6 w-6 rounded-full bg-lime-500 lg:flex"></div>
	<span class="text-lime-500">{descriptions.green}</span>
	<!-- {:else if status === 'yellow'}
	<div class="hidden h-6 w-6 rounded-full bg-lime-500 lg:flex"></div>
	<span class="text-lime-500">{descriptions.yellow}</span> -->
{:else if notification.level === 'due'}
	<div class="hidden h-6 w-6 rounded-full bg-orange-400 lg:flex"></div>
	<span class="text-orange-400">{descriptions.orange}</span>
{:else if notification.level === 'overdue'}
	<div class="hidden h-5 w-5 rounded-full bg-red-700 lg:flex"></div>
	<span class="text-red-700">{descriptions.red}</span>
{:else}
	<span>Nil</span>
{/if}
