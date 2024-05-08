import { writable } from "svelte/store";
import type { Session, Lore } from "$lib/types/contribution-types";


export const currentSession = writable<Session>();
export const subTitle = writable<string>();
export const latestContribution = writable<Lore>();