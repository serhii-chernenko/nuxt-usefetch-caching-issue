# useFetch caching issue

I see that Nuxt 3.17.3 has "major" imporvements regarding the usage of `useFetch` and `useAsyncData` composables that has to significantly improve performance by sharing and caching data without a requirement of usage `getCachedData`.
The same `key` value is enough.

I wanted to play with this a bit and prepared this demo repo to explain my issue.

- Repo: https://github.com/serhii-chernenko/nuxt-usefetch-caching-issue
- Demo: https://nuxt-usefetch-caching-issue.nuxt-test.workers.dev
- Nuxt updates: https://nuxt.com/blog/v3-17

## Issue explanation

I'm expecting that once I used `useFetch` with a key, e.g. `items`, it has to be cached and shared across all pages and components which use fetching for the same `key` (`items`).

I prepared 2 pages:
- Home page `/`
- Items page `/items`

The `pages/items.vue` component includes the `components/Items.vue` component twice.

In the `Items.vue` I just used `useFetch`:
```ts
const { data: items, error, refresh } = await useFetch("/api/items", {
  key: "items",
  default: () => [],
});
```

And there are 2 issue actually.

### Network request retriggered when page accessed

When I go to https://nuxt-usefetch-caching-issue.nuxt-test.workers.dev and then to https://nuxt-usefetch-caching-issue.nuxt-test.workers.dev/items, I see in the Network tab that the request sends again, every time. I kinda didn't expect this, because I guessed that the data has to be provided by cached data already by the `key`.

![image](https://github.com/user-attachments/assets/aa602029-7128-40c7-9e87-c2ccb98a123f)

**Note here**
While the `Items.vue` inserted to the `pages/items.vue` twice, I added:
```ts
dedupe: 'defer`
```
to avoid duplicated request at the same time.

Is this an expected behavior? Because I guessed once it's cached, there's no new requests expected until manually refreshed at least.
