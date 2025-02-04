### **📄 README.md - Clerk を使用した Sign-in / Sign-up 機能の実装**  

```md
# 🛠 Portfolio Auth - Clerk を利用した認証機能

このプロジェクトでは **[Clerk](https://clerk.com/)** を使用して **Sign-in / Sign-up** の認証機能を実装しました。  
Next.js (`app router`) + Clerk を組み合わせ、シンプルかつ安全なユーザー管理を提供します。

---

### 📌 インストール & セットアップ

### 1️⃣ **Clerk の API キーを取得**
1. [Clerk Dashboard](https://dashboard.clerk.com/) にログイン  
2. 新しいプロジェクトを作成  
3. `.env.local` に以下の環境変数を追加
```sh
NEXT_PUBLIC_CLERK_FRONTEND_API=<YOUR_FRONTEND_API>
CLERK_SECRET_KEY=<YOUR_SECRET_KEY>
```

---

### 2️⃣ **必要なパッケージをインストール**
```sh
npm install @clerk/nextjs
```

---

## 🚀 実装内容

### **🖥️ `middleware.ts` - Clerk の認証をミドルウェアで適用**
```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```
**📌 ポイント**
- `/sign-in` と `/sign-up` は **公開ルート** として認証不要
- それ以外のページは **認証必須**（未認証ユーザーは `sign-in` にリダイレクト）

---

### **🔐 `app/sign-in/page.tsx` - Sign-in ページ**
```tsx
'use client'

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
```
**📌 ポイント**
- `SignIn` コンポーネントを使用し、簡単にログイン画面を表示
- `flexbox` を使って **画面中央に配置**

---

### **📝 `layout.tsx` - アプリ全体の認証管理**
```tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
```
**📌 ポイント**
- **ClerkProvider** を全体でラップし、認証情報を管理

---

## ✅ **認証の動作確認**
1. **`npm run dev` でアプリを起動**
2. `/sign-in` にアクセスし、ログインテスト
3. **未ログイン時に認証必須ページ (`/dashboard` など) にアクセスすると、`sign-in` にリダイレクトされる**
