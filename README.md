This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## `useUniqViewSeconds` hook
The hook is saved into [`./src/app/hooks/useUniqViewSeconds.tsx`](./src/app/hooks/useUniqViewSeconds.tsx)

### How is this implemented?
- use of react's useEffect, useState and useCallback
    - states: `[uniqueSeconds, originalSeconds, loading, error]`
- implement a method to fetch the `numbers` which returns a `number[][]` data-type from `mockapi.io` called `fetchViewSeconds`
    - this method will utilise `useCallback` to memoize the return value, to prevent unnecessary re-renders towards the component
- Add new `MockApiResponse` type based on return value
- How to get the sorted + unique array of numbers from `data.numbers`?
    - by doing `...new Set(data.numbers.flat())`, the reason `Set` is used is because it will deduplicate the array of numbers for me directly, instead of having to unique the array myself. Furthermore, use of the `.flat()` method to flatten the `number[][]` into `number[]`
    - After the `new Set(...)` and `.flat()`, we will run a `.sort()` to sort by ascending order
- the `useUniqViewSeconds` should return 4 variables:
    - originalSeconds → `number[][]`
    - uniqueSeconds → `number[]`
    - loading → `boolean`
    - error → `Error | null`

### Generated output
Just using the default nextjs `create-next-app` content with additional `div` and `span` to render the difference of the original `originalSeconds` and `uniqueSeconds`

![Generated Output](https://raw.githubusercontent.com/kyapwc/main/betamind/assets/output.png)
