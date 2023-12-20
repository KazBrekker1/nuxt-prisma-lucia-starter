import { useUser } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async () => {
    const user = useUser();
    const { data, error } = await useFetch("/api/user");
    if (error.value) throw createError("Failed to fetch data");
    user.value = data.value?.user ?? null as any;
});