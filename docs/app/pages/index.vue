<script setup lang="ts">
import type { ButtonProps, PageFeatureProps } from '@nuxt/ui'

const { data: page } = await useAsyncData('landing', () => queryCollection('landing').path('/').first())

useSeoMeta({
  title: 'tauri-plugin-centrifugo',
  description: page.value?.description,
  ogTitle: 'tauri-plugin-centrifugo',
  ogDescription: page.value?.description,
})

const heroLinks: ButtonProps[] = [
  { label: 'Get started', to: '/getting-started/introduction', size: 'lg', trailingIcon: 'i-lucide-arrow-right' },
  { label: 'GitHub', to: 'https://github.com/s00d/tauri-plugin-centrifugo', target: '_blank', size: 'lg', color: 'neutral', variant: 'outline', icon: 'i-simple-icons-github' },
]

const features: PageFeatureProps[] = [
  { title: 'Official SDK inside', description: 'Built on centrifuge-client: reconnects with backoff, ping/pong liveness, wake-from-sleep detection.', icon: 'i-lucide-radio-tower', to: '/guides/connection' },
  { title: 'WebSocket + HTTP streaming', description: 'JSON or Protobuf over WebSocket, with an optional HTTP-streaming fallback and custom headers.', icon: 'i-lucide-cable', to: '/guides/connection' },
  { title: 'Recovery and deltas', description: 'Recoverable and positioned subscriptions, resume from a saved stream position, fossil delta compression.', icon: 'i-lucide-history', to: '/guides/subscriptions' },
  { title: 'Token bridge', description: 'The SDK asks your frontend for connection and subscription tokens before they expire.', icon: 'i-lucide-key-round', to: '/guides/tokens' },
  { title: 'Rust backend', description: 'Use the same client from Rust, or the SDK itself as tauri_plugin_centrifugo::centrifuge.', icon: 'i-simple-icons-rust', to: '/guides/rust' },
  { title: 'Generated reference', description: 'Every function, type, Tauri command and permission, built from the sources on each release.', icon: 'i-lucide-book-open', to: '/reference/javascript-api' },
]

const quickLinks: ButtonProps[] = [
  { label: 'Quick start', to: '/getting-started/quick-start', trailingIcon: 'i-lucide-arrow-right' },
  { label: 'Deprecations', to: '/deprecations', color: 'neutral', variant: 'outline' },
]
</script>

<template>
  <div>
    <UPageHero
      title="Centrifugo real-time for Tauri 2 apps"
      description="Connect, subscribe, publish, RPC, history and presence from your Tauri frontend or backend, on desktop, Android and iOS."
      :links="heroLinks"
    >
      <template #headline>
        <UButton to="/changelog" label="0.2: now on the official centrifuge-client SDK" trailing-icon="i-lucide-arrow-right" color="neutral" variant="subtle" size="sm" />
      </template>
    </UPageHero>

    <UPageSection title="What you get" :features="features" />

    <UPageSection
      title="Connect, listen, publish"
      description="Connect once, listen to centrifugo:* events and publish JSON. Reconnects, token refresh and recovery are handled by the SDK."
      orientation="horizontal"
      :links="quickLinks"
    >
      <div class="min-w-0">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </UPageSection>
  </div>
</template>
