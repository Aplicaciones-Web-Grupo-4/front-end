// events/application/event.store.js
import { defineStore } from "pinia";
import { fetchEventBySlug } from "../infrastructure/event-api";
import { toEventEntity } from "../infrastructure/event.assembler";

export const useEventStore = defineStore("event", {
    state: () => ({
        current: null,
        status: "idle", // idle | loading | ready | error
        error: null,
    }),
    actions: {
        async loadBySlug(slug) {
            this.status = "loading";
            this.error = null;
            try {
                const dto = await fetchEventBySlug(slug);
                this.current = toEventEntity(dto);
                this.status = "ready";
            } catch (e) {
                this.error = e?.message ?? String(e);
                this.status = "error";
            }
        },
        clear() {
            this.current = null;
            this.status = "idle";
            this.error = null;
        }
    }
});
