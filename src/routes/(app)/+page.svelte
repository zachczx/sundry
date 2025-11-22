<script lang="ts">
	import PageWrapper from '$lib/shell/PageWrapper.svelte';
	import { pb } from '$lib/pb';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import MaterialSymbolsChevronRight from '$lib/assets/svg/MaterialSymbolsChevronRight.svelte';
	import { createQuery, useQueryClient, type CreateQueryResult } from '@tanstack/svelte-query';
	import {
		createUserQueryOptions,
		logsQueryOptions,
		notificationQueryOptions,
		trackerNameToId
	} from '$lib/queries';
	import { getNotificationStatus } from '$lib/notification';
	import { goto } from '$app/navigation';
	import MaterialSymbolsHealthAndSafety from '$lib/assets/svg/MaterialSymbolsHealthAndSafety.svelte';
	import IconParkSolidBottleOne from '$lib/assets/svg/IconParkSolidBottleOne.svelte';
	import PhTowelFill from '$lib/assets/svg/PhTowelFill.svelte';
	import MaterialSymbolsTimer from '$lib/assets/svg/MaterialSymbolsTimer.svelte';
	import ActionCard from '$lib/ui/ActionCard.svelte';
	import ActionCardCompact from '$lib/ui/ActionCardCompact.svelte';
	import { type RecordModel } from 'pocketbase';
	import { type Component } from 'svelte';
	import MaterialSymbolsArrowRightAlt from '$lib/assets/svg/MaterialSymbolsArrowRightAlt.svelte';
	import MaterialSymbolsPill from '$lib/assets/svg/MaterialSymbolsPill.svelte';
	import MaterialSymbolsShower from '$lib/assets/svg/MaterialSymbolsShower.svelte';
	import MaterialSymbolsFlight from '$lib/assets/svg/MaterialSymbolsFlight.svelte';
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import EmptyCorgi from '$lib/assets/empty.webp?w=200&enhanced';
	import StreamlineColorHotelLaundryFlat from '$lib/assets/expressive-icons/StreamlineColorHotelLaundryFlat.svelte';
	import FluentEmojiFlatLotionBottle from '$lib/assets/expressive-icons/FluentEmojiFlatLotionBottle.svelte';
	import FluentEmojiFlatShield from '$lib/assets/expressive-icons/FluentEmojiFlatShield.svelte';
	import FluentEmojiFlatStopwatch from '$lib/assets/expressive-icons/FluentEmojiFlatStopwatch.svelte';
	import FluentEmojiFlatAirplane from '$lib/assets/expressive-icons/FluentEmojiFlatAirplane.svelte';
	import FluentEmojiFlatBed from '$lib/assets/expressive-icons/FluentEmojiFlatBed.svelte';
	import FluentEmojiFlatShower from '$lib/assets/expressive-icons/FluentEmojiFlatShower.svelte';

	dayjs.extend(relativeTime);
	dayjs.extend(utc);
	dayjs.extend(timezone);

	let towelButtonStatus: ButtonState = $state('default');
	let sprayButtonStatus: ButtonState = $state('default');
	let gummyButtonStatus: ButtonState = $state('default');
	let bedsheetButtonStatus: ButtonState = $state('default');
	let doggoBathButtonStatus: ButtonState = $state('default');
	let doggoChewableButtonStatus: ButtonState = $state('default');

	const user = createQuery(createUserQueryOptions);
	const tanstackClient = useQueryClient();

	const latestLogs = createQuery(notificationQueryOptions);

	// Upcoming
	const doggoBath = $derived.by(() => {
		if (latestLogs.isSuccess) {
			return latestLogs.data.find((item) => item.tracker === trackerNameToId('doggoBath'));
		}
		return undefined;
	});

	let doggoBathNotification = $derived.by(() => getNotificationStatus(doggoBath));

	const doggoChewable = $derived.by(() => {
		if (latestLogs.isSuccess) {
			return latestLogs.data.find((item) => item.tracker === trackerNameToId('doggoChewable'));
		}
		return undefined;
	});

	let doggoChewableNotification = $derived.by(() => getNotificationStatus(doggoChewable));

	const bedsheet = $derived.by(() => {
		if (latestLogs.isSuccess) {
			return latestLogs.data.find((item) => item.tracker === trackerNameToId('bedsheet'));
		}
		return undefined;
	});

	let bedsheetNotification = $derived.by(() => getNotificationStatus(bedsheet));
</script>

<PageWrapper title="Sundry" back={false} {pb}>
	<main class="h-full">
		<div id="mobile" class="grid w-full max-w-lg gap-8 justify-self-center lg:text-base">
			<section class="grid gap-4 py-2">
				<h2 class="text-base-content/70 text-lg font-bold">Important</h2>
				<ActionCardCompact
					options={{
						collectionName: 'towel',
						title: 'Wash Towel',
						route: '/household/towel',
						icon: StreamlineColorHotelLaundryFlat,
						button: {
							status: towelButtonStatus,
							text: 'Washed'
						}
					}}
				></ActionCardCompact>

				<ActionCardCompact
					options={{
						collectionName: 'spray',
						title: 'Spray Nose',
						route: '/personal/spray',
						icon: FluentEmojiFlatLotionBottle,
						button: {
							status: sprayButtonStatus,
							text: 'Sprayed'
						}
					}}
				></ActionCardCompact>

				<ActionCardCompact
					options={{
						collectionName: 'gummy',
						title: 'Elderberry Gummy',
						route: '/personal/gummy',
						icon: FluentEmojiFlatShield,
						button: {
							status: gummyButtonStatus,
							text: 'Ate'
						}
					}}
				></ActionCardCompact>
			</section>

			<section class="grid gap-0 py-2">
				<h2 class="text-base-content/70 text-lg font-bold">General</h2>

				{#if bedsheetNotification.show}
					<ActionCardCompact
						options={{
							collectionName: 'bedsheet',
							title: 'Bedsheet',
							route: '/household/bedsheet',
							icon: FluentEmojiFlatBed,
							button: {
								status: bedsheetButtonStatus,
								text: 'Changed'
							}
						}}
					></ActionCardCompact>
				{/if}

				{#if doggoBathNotification.show}
					<ActionCardCompact
						options={{
							collectionName: 'doggoBath',
							title: 'Bath',
							route: '/pet/bath',
							icon: FluentEmojiFlatShower,
							button: {
								status: doggoBathButtonStatus,
								text: 'Bathed'
							}
						}}
					></ActionCardCompact>
				{/if}

				{#if doggoChewableNotification.show}
					<ActionCardCompact
						options={{
							collectionName: 'doggoChewable',
							title: 'Chewable',
							route: '/pet/chewable',
							icon: FluentEmojiFlatShield,
							button: {
								status: doggoChewableButtonStatus,
								text: 'Fed'
							}
						}}
					></ActionCardCompact>
				{/if}

				{#if !bedsheetNotification && !doggoBathNotification.show && !doggoChewableNotification.show}
					<enhanced:img src={EmptyCorgi} alt="nothing" class="justify-self-center" />
					<p class="text-center">No other upcoming tasks!</p>
				{/if}
			</section>

			<section class="grid gap-0 py-0">
				<h2 class="text-base-content/70 text-lg font-bold">Quick Links</h2>
				<div class="flex items-center gap-2">
					<a
						href="/household/count"
						class="active:bg-neutral/10 focus-within:bg-neutral/10 focus-within:text-base-content active:text-base-content text-neutral grid aspect-square w-24 content-center justify-items-center gap-1 rounded-2xl p-2 text-sm font-semibold"
					>
						<FluentEmojiFlatStopwatch class="size-8" />
						Stopwatch</a
					>
					<a
						href="/profile/vacation"
						class="active:bg-neutral/10 focus-within:bg-neutral/10 focus-within:text-base-content active:text-base-content text-neutral grid aspect-square w-24 content-center justify-items-center gap-1 rounded-2xl p-2 text-sm font-semibold"
					>
						<FluentEmojiFlatAirplane class="size-8" />
						Vacation</a
					>
				</div>
			</section>
		</div>
	</main>
</PageWrapper>
