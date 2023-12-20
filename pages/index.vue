<script lang="ts" setup>
import { useAuthenticatedUser } from "~/composables/auth";

definePageMeta({
  middleware: ["protected"],
});

const user = useAuthenticatedUser();

const handleLogout = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  await $fetch("/api/logout", {
    method: "POST",
    redirect: "manual",
  });
  await navigateTo("/login");
};
</script>

<template>
  <UCard>
    <template #header>
      <h1>Profile</h1>
    </template>
    <p>Username: {{ user.username }}</p>
    <p>User id: {{ user.userId }}</p>
    <p>Email: {{ user.email }}</p>
    <template #footer>
      <form method="post" action="/api/logout" @submit.prevent="handleLogout">
        <UButton type="submit" label="Sign out" color="red" />
      </form>
    </template>
  </UCard>
</template>
