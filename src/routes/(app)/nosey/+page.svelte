<script lang="ts">
	import Red from '$lib/images/red.webp?w=600&enhanced';
	import Orange from '$lib/images/orange.webp?w=600&enhanced';
	import Yellow from '$lib/images/yellow.webp?w=600&enhanced';
	import Green from '$lib/images/green.webp?w=600&enhanced';
	import { pb } from '$lib/pb';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import timezone from 'dayjs/plugin/timezone';
	import { Calendar, DayGrid, Interaction } from '@event-calendar/core';
	import PageWrapper from '$lib/PageWrapper.svelte';
	import { addToast } from '$lib/ui/ArkToaster.svelte';
	import MaterialSymbolsCheck from '$lib/assets/svg/MaterialSymbolsCheck.svelte';
	import MaterialSymbolsAdd from '$lib/assets/svg/MaterialSymbolsAdd.svelte';

	dayjs.extend(relativeTime);
	dayjs.extend(utc);
	dayjs.extend(timezone);

	let sprayDB: SprayDB[] | undefined = $state([]);
	let singleDay: SprayDB[] | undefined = $state([]);

	onMount(async () => {
		if (pb.authStore.isValid) {
			sprayDB = await pb.collection('spray').getFullList({
				sort: '-time'
			});
		}
	});

	async function handleClick() {
		spinner = true;
		const result = await pb.collection('spray').create({
			user: pb.authStore.record?.id,
			time: dayjs.tz(new Date(), 'Asia/Singapore')
		});

		if (result.id) {
			addToast('success', 'Added successfully!');
			spinner = false;
		}

		sprayDB = await pb.collection('spray').getFullList({
			sort: '-time'
		});
	}

	let times = $derived.by(() => {
		let times: Calendar.EventInput[] = [];
		if (sprayDB && sprayDB.length > 0) {
			for (const r of sprayDB) {
				//Adding the timezone here creates a problem for mobile devices, not sure why => .tz('Asia/Singapore');
				const n = dayjs.utc(r.time);
				times.push({ start: n.toDate(), end: n.toDate(), title: `— Sprayed` });
			}
		}
		return times;
	});

	let options: Calendar.Options = $derived.by(() => {
		return {
			view: 'dayGridMonth',
			events: [...times],
			selectBackgroundColor: 'red',
			eventBackgroundColor: '#4a4a7d',
			titleFormat: (date) => {
				const month = dayjs(date).get('month');
				if (month === 8) {
					return dayjs(date).format('MMMM YY');
				}
				return dayjs(date).format('MMMM YYYY');
			},
			dateClick: async (info) => {
				singleDay = sprayDB?.filter((day) => {
					return dayjs(day.time).get('date') == dayjs(info.date).get('date');
				});
				singleDayModal.showModal();
			},
			eventClick: async (info) => {
				singleDay = sprayDB?.filter((day) => {
					return dayjs(day.time).get('date') == dayjs(info.event.start).get('date');
				});
				singleDayModal.showModal();
			}
		};
	});

	let singleDayModal = $state() as HTMLDialogElement;
	let spinner = $state(false);

	function getStatusColorFromValue(val: number): string {
		const day = 24;

		if (val > 0 && val <= 3 * day) return 'green';

		// if (val > 2 * day && val <= 4 * day) return 'yellow';

		// if (val > 4 * day && val <= 6 * day) return 'orange';

		if (val > 3 * day && val <= 999 * day) return 'red';

		return '';
	}

	let lastSpray: number | undefined = $derived.by(() => {
		let lastSpray;
		if (sprayDB && sprayDB.length > 0) {
			const lastWashDate = dayjs(sprayDB[0].time);
			const today = dayjs();
			lastSpray = today.diff(lastWashDate, 'hours', true);
			return lastSpray;
		}
	});

	let status = $derived.by(() => {
		if (!lastSpray) {
			return '';
		}
		return getStatusColorFromValue(lastSpray);
	});

	let currentTab = $state('overview');
</script>

<svelte:head>
	<title>Nosey</title>
</svelte:head>

<PageWrapper title="Spray Logs" {pb} noPadding={true}>
	<main
		class="grid w-full max-w-[1200px] content-start justify-items-center gap-4 justify-self-center lg:grid-cols-2"
	>
		<div class="grid content-start justify-items-center gap-4 px-4 pt-4">
			{#key sprayDB}
				{#if status === 'green'}
					<enhanced:img src={Green} alt="Clean" class="rounded-3xl" />
				{:else if status === 'yellow'}
					<enhanced:img src={Yellow} alt="Still Good" class="rounded-3xl" />
				{:else if status === 'orange'}
					<enhanced:img src={Orange} alt="Ripening" class="rounded-3xl" />
				{:else}
					<enhanced:img src={Red} alt="Time to Wash!" class="rounded-3xl" />
				{/if}
			{/key}
			<button
				class="btn btn-xl btn-primary flex w-full min-w-54 items-center gap-2"
				onclick={handleClick}
				><MaterialSymbolsAdd class="size-[1.3em]" />
				{#if !spinner}
					Just Sprayed!
				{:else}
					<span class="loading loading-md loading-spinner"></span>
				{/if}
			</button>
		</div>

		<div class="grid w-full content-start gap-8 py-4">
			<ul class="grid w-full grid-cols-2 content-center justify-items-center">
				<li class="w-full">
					<button
						class={[
							currentTab === 'overview' ? 'border-b-primary font-semibold' : 'border-b-base-300',
							'w-full border-b-2 text-center'
						]}
						onclick={() => {
							currentTab = 'overview';
						}}
					>
						Overview</button
					>
				</li>
				<li class="w-full">
					<button
						class={[
							currentTab === 'calendar' ? 'border-b-primary font-semibold' : 'border-b-base-300',
							'w-full border-b-2 text-center'
						]}
						onclick={() => {
							currentTab = 'calendar';
						}}
					>
						Calendar</button
					>
				</li>
			</ul>
			{#if currentTab === 'overview'}
				<div class="w-full px-4">
					<div
						class="text-md border-base-content/5 bg-base-200/50 grid grid-cols-2 content-center gap-4 rounded-lg border shadow"
					>
						<div class="border-r-base-content/15 grid justify-items-center border-r p-4">
							<div>Status</div>
							{#key sprayDB}
								{#if status}
									<div class="flex min-h-20 items-center justify-center gap-4 text-2xl font-bold">
										{#if status === 'green'}
											<div class="hidden h-6 w-6 rounded-full bg-lime-500 lg:flex"></div>
											<span class="text-center text-lime-500">Dosed</span>
										{:else if status === 'yellow'}
											<div class="hidden h-6 w-6 rounded-full bg-yellow-500 lg:flex"></div>
											<span class="text-yellow-500">Good</span>
										{:else if status === 'orange'}
											<div class="hidden h-6 w-6 rounded-full bg-orange-400 lg:flex"></div>
											<span class="text-orange-400">Due</span>
										{:else}
											<div class="hidden h-5 w-5 rounded-full bg-red-700 lg:flex"></div>
											<span class="text-red-700">Overdue</span>
										{/if}
									</div>
								{:else}
									<div class="flex min-h-20 items-center gap-4 text-2xl font-bold">Nil</div>
								{/if}
							{/key}
						</div>
						<div class="grid justify-items-center p-4">
							<div>Last Sprayed</div>
							<div class="text-center text-2xl font-bold">
								{#key sprayDB}
									{#if sprayDB && sprayDB.length > 0}
										{@const formatted = dayjs(sprayDB[0].time).fromNow()}
										{formatted}
									{:else}
										<div class="flex min-h-20 items-center gap-4 text-2xl font-bold">Nil</div>
									{/if}
								{/key}
							</div>
						</div>
					</div>
				</div>
			{/if}
			{#if currentTab === 'calendar'}
				<!-- The minmax(0, 1fr) or min-w-0 approaches explicitly tell the browser that the calendar can shrink below its content size, which is often what's needed for responsive calendar components. -->
				<div class="grid w-full grid-cols-[minmax(0,1fr)] overflow-hidden px-4">
					{#key sprayDB}
						<Calendar plugins={[DayGrid, Interaction]} {options} />
					{/key}
				</div>
			{/if}
		</div>
	</main>
</PageWrapper>
<span class="ec ec-time-grid ec-title hidden"></span>

<dialog bind:this={singleDayModal} class="modal">
	<div class="modal-box">
		{#if singleDay && singleDay.length > 0}
			{@const theDay = dayjs(singleDay[0].time).format('D MMM YYYY')}
			<h3 class="text-lg font-bold">{theDay}</h3>
			<div class="py-4">
				<ul class="list-disc">
					{#each singleDay as day}
						{@const formatted = dayjs(day.time).format('h:mma')}
						<li class="flex items-center gap-2">
							<MaterialSymbolsCheck class="text-success size-[1.3em]" />
							{formatted}
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<h3 class="text-lg font-bold">Nothing here!</h3>
		{/if}
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>

<style>
	:global {
		.ec.ec-day-grid {
			/* max-width: 90vw; */
			width: 100%;
		}

		.ec-title {
			font-size: 1.5rem;
			font-weight: 700 !important;
		}

		.ec-today {
			background-color: var(--color-primary-content) !important;
		}

		.ec-day {
			&:hover {
				background-color: rgba(242, 189, 205, 0.3);
				.ec-day-head {
					font-weight: 600 !important;
				}
				color: var(--color-primary);
			}
		}

		.ec-bg-events {
			&:hover {
				cursor: pointer;
			}
		}

		/* .ec-event-title {
			margin-inline-start: 1em;
		} */
	}
</style>
