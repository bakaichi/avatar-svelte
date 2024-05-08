import { writable } from "svelte/store";
import type { Session } from "$lib/types/contribution-types";

export const currentSession = writable<Session>();
export const subTitle = writable<string>();