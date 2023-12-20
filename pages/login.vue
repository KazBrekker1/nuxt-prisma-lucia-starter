<script lang="ts" setup>
import { useUser } from "~/composables/auth";

const user = useUser();
if (user.value) {
  await navigateTo("/"); // redirect to profile page
}

const errorMessage = ref<string | null>(null);

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      redirect: "manual",
    });
    await navigateTo("/"); // profile page
  } catch (e) {
    const { data: error } = e as {
      data: {
        message: string;
      };
    };
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <UCard>
    <h1>Sign in</h1>
    <form method="post" action="/api/login" @submit.prevent="handleSubmit">
      <UInput type="email" name="email" id="email" placeholder="Email" />
      <UInput
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <UButton type="submit" label="Submit" />
    </form>
    <p class="error">{{ errorMessage }}</p>
    <ULink to="/signup">Create an account</ULink>
  </UCard>
</template>
