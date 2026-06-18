# 企業向けセクション ＋ 問い合わせ窓口 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** チラシQRで来た企業向けに、価値提案を伝える専用ページ `/business` と問い合わせ窓口（Tally埋め込み＋mailtoフォールバック）を追加し、トップに導線を足す。

**Architecture:** 既存の編集デザインを土台に、ブルー差し色（A案）で企業向けUIを構築。文言は `src/lib/data/business.ts` に集約し、表示用コンポーネントは `src/components/business/` に分割。問い合わせは外部フォーム（Tally）の iframe 埋め込みで、回答は company@be-u.co.jp に通知。自社サーバー・APIキー不要。

**Tech Stack:** Next.js 16 (App Router) / React 19 / Tailwind CSS v4 / TypeScript。`@/` は `src/` のエイリアス。

> **テストについて:** 本プロジェクトはテストランナー未導入（依存に無し）。本計画ではテストフレームワークを新規導入しない（YAGNI）。各タスクの検証は `npm run build`（型チェック含む）と `npm run lint` の成功、最後にローカル目視確認で行う。

---

## ファイル構成

**新規作成:**
- `src/lib/data/business.ts` — 企業ページの全コンテンツ（型付き定数）
- `src/components/business/SectionHeading.tsx` — 共通の見出し（eyebrow＋title）
- `src/components/business/BusinessHero.tsx`
- `src/components/business/PainPoints.tsx`
- `src/components/business/MarketStats.tsx`
- `src/components/business/HowItWorks.tsx`
- `src/components/business/CompanyCapabilities.tsx`
- `src/components/business/WhyChosen.tsx`
- `src/components/business/ZeroFeeBanner.tsx`
- `src/components/business/PricingPlans.tsx`
- `src/components/business/StudentArticlesCTA.tsx`
- `src/components/business/ContactSection.tsx` — Tally埋め込み（client）＋mailtoフォールバック
- `src/app/business/page.tsx` — 上記を組み立て＋metadata
- `src/components/home/CompanyBand.tsx` — トップの企業向け入口バンド

**変更:**
- `src/app/globals.css` — `--color-brand` をテーマに追加
- `src/app/page.tsx` — `CompanyBand` を挿入
- `src/components/layout/Header.tsx` — 「企業の方へ」リンク追加
- `src/components/layout/Footer.tsx` — 企業導線＋運営者情報追加
- `README.md` — `NEXT_PUBLIC_TALLY_FORM_ID` の設定手順

---

### Task 1: ブランドカラーをテーマに追加

**Files:**
- Modify: `src/app/globals.css:3-7`

- [ ] **Step 1: `@theme` にブランド色を追加**

`src/app/globals.css` の `@theme { ... }` ブロックを以下に置き換える:

```css
@theme {
  --font-sans: "Noto Sans JP", "Hiragino Sans", sans-serif;
  --color-background: #ffffff;
  --color-foreground: #111111;
  --color-brand: #1d4ed8;
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功（エラーなし）。これで `bg-brand` / `text-brand` / `border-brand` が利用可能になる。

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add brand accent color to theme"
```

---

### Task 2: 企業ページのコンテンツデータモジュール

**Files:**
- Create: `src/lib/data/business.ts`

- [ ] **Step 1: データモジュールを作成**

`src/lib/data/business.ts`:

```ts
export interface PainPoint {
  text: string;
}

export interface MarketStat {
  value: string;
  unit: string;
  label: string;
  note: string;
}

export interface Capability {
  title: string;
  desc: string;
}

export interface Reason {
  title: string;
  desc: string;
}

export interface PlanFeature {
  label: string;
  note: string;
}

export interface Plan {
  name: string;
  price: string;
  unit: string;
  target: string;
  features: PlanFeature[];
  popular?: boolean;
}

export interface FlowColumn {
  label: string;
  points: string[];
}

export const CONTACT_EMAIL = "company@be-u.co.jp";

export const businessHero = {
  eyebrow: "新潟県内企業の経営者・採用ご担当者様へ",
  titleTop: "待つ採用から、",
  titleBottom: "声をかける採用へ。",
  lead: "LINK Uには、200名以上の新潟の学生のストーリー記事が集まっています。記事で人となりを知ってから、気になる学生へ採用オファー。出会いをその場限りで終わらせない、新しい採用の仕組みです。",
};

export const painPoints: PainPoint[] = [
  { text: "知名度が低く、大手の採用媒体では他社に埋もれて見つけてもらえない" },
  { text: "事業や社風には自信があるのに、業界や業種のイメージだけで敬遠される" },
  { text: "会社の魅力が伝わりきらず、十分な数の学生に会えていない" },
];

export const marketStats: MarketStat[] = [
  {
    value: "8.98",
    unit: "倍",
    label: "中小企業の大卒求人倍率",
    note: "学生1人を約9社で取り合う採用難の水準 ※リクルートワークス研究所「第42回 ワークス大卒求人倍率調査(2026年卒)」",
  },
  {
    value: "33",
    unit: "%減",
    label: "中小企業を希望する学生数",
    note: "中小企業への就職希望者は1年で約3割減少 ※同調査",
  },
  {
    value: "51.7",
    unit: "%",
    label: "新潟県内学生の県内就職率",
    note: "約半数が県外で就職の過去最低水準 ※新潟労働局調べ(2025年3月卒業者)",
  },
];

export const flowColumns: FlowColumn[] = [
  {
    label: "学生（無料参加）",
    points: [
      "キャリアコンサルタントの取材で自分をPRできる記事を制作",
      "強み・志向をタグで可視化",
    ],
  },
  {
    label: "LINK U",
    points: ["ストーリー記事プラットフォーム", "年4回の「Meet up」イベント"],
  },
  {
    label: "企業（会員制）",
    points: [
      "学生データベースを閲覧し、DM・採用オファーを送信",
      "面談・イベントで直接学生と会える",
    ],
  },
];

export const capabilities: Capability[] = [
  { title: "学生DB検索", desc: "ストーリー記事とタグで、自由に合う学生を探せます。" },
  {
    title: "スカウト・DM送信",
    desc: "気になる学生へ直接アプローチ。採用の接点をつくります。",
  },
  {
    title: "面談・リアルイベント",
    desc: "カジュアル面談やMeet upで、選考の前にまず会って話せます。",
  },
  {
    title: "企業PR記事掲載",
    desc: "貴社のストーリーも記事化。想いで学生に選ばれる企業へ。",
  },
];

export const reasons: Reason[] = [
  {
    title: "プロの取材による「本音」のストーリー",
    desc: "学生が自分で書くのではなく、キャリアコンサルタントが取材・編集した記事を掲載。挫折や転機まで描かれるから、人柄が立体的に伝わります。",
  },
  {
    title: "会う前から相互理解がはじまる",
    desc: "記事を読んでから会えるから、面談の初回から一歩深い対話に。ミスマッチと早期離職のリスクを減らせます。",
  },
  {
    title: "卒業後もつながる「地域人材DB」",
    desc: "他社内定後もキャリアトラックとして関係が継続。将来のUターン・副業人材との接点資産になります。",
  },
];

export const zeroFee = {
  caption: "採用が決まっても",
  title: "成果報酬0円",
  desc: "声をかけた学生が何名採用に至っても、年会費以外の費用は一切かかりません。",
};

export const plans: Plan[] = [
  {
    name: "ライトプラン",
    price: "15",
    unit: "万円（年額）",
    target: "まずは小さく試したい企業さま向け",
    features: [
      { label: "学生DB閲覧", note: "制限あり" },
      { label: "WEBスカウト機能", note: "10回/年まで" },
      { label: "Meet upイベント参加", note: "有料" },
      { label: "企業PR記事制作", note: "有料" },
    ],
  },
  {
    name: "スタンダードプラン",
    price: "30",
    unit: "万円（年額）",
    target: "アクティブに動いて確実にマッチングを狙いたい企業さま向け",
    popular: true,
    features: [
      { label: "学生DB閲覧", note: "無制限" },
      { label: "WEBスカウト機能", note: "無制限" },
      { label: "Meet upイベント参加", note: "2回/年まで無料" },
      { label: "企業PR記事制作", note: "1件/年まで無料" },
    ],
  },
];

export const operator = {
  service: {
    role: "運営",
    company: "株式会社be U",
    tel: "050-6883-3353",
    email: "company@be-u.co.jp",
  },
  sales: {
    role: "販売",
    company: "NPO法人新潟ウェイ・オブ・ワーク",
    tel: "025-278-7039",
    email: "company@niigata-wow.jp",
  },
  site: "linku-story.com",
};
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功（型エラーなし）。

- [ ] **Step 3: Commit**

```bash
git add src/lib/data/business.ts
git commit -m "feat: add company page content data module"
```

---

### Task 3: 共通見出しコンポーネント

**Files:**
- Create: `src/components/business/SectionHeading.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/SectionHeading.tsx`:

```tsx
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-wide leading-snug">
        {title}
      </h2>
    </div>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/SectionHeading.tsx
git commit -m "feat: add shared SectionHeading component"
```

---

### Task 4: ヒーローセクション

**Files:**
- Create: `src/components/business/BusinessHero.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/BusinessHero.tsx`:

```tsx
import Link from "next/link";
import { businessHero } from "@/lib/data/business";

export default function BusinessHero() {
  return (
    <section className="bg-gray-50/60 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="block text-xs md:text-sm tracking-[0.25em] text-brand mb-5">
          {businessHero.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-wide">
          {businessHero.titleTop}
          <br />
          <span className="text-brand">{businessHero.titleBottom}</span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-8 max-w-2xl mx-auto">
          {businessHero.lead}
        </p>
        <div className="mt-10">
          <Link
            href="#contact"
            className="inline-block px-7 py-3 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity"
          >
            お問い合わせ・ご相談
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/BusinessHero.tsx
git commit -m "feat: add BusinessHero section"
```

---

### Task 5: お悩みセクション

**Files:**
- Create: `src/components/business/PainPoints.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/PainPoints.tsx`:

```tsx
import { painPoints } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function PainPoints() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Issues" title="こんなお悩みはありませんか？" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((p, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-6 hover:border-brand transition-colors"
            >
              <span className="text-2xl font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/PainPoints.tsx
git commit -m "feat: add PainPoints section"
```

---

### Task 6: 採用環境の数値セクション

**Files:**
- Create: `src/components/business/MarketStats.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/MarketStats.tsx`:

```tsx
import { marketStats } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function MarketStats() {
  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Data"
          title="採用環境は、年々厳しくなっています。"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {marketStats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-sm text-gray-500 mb-2">{s.label}</p>
              <p className="text-5xl font-bold text-brand tracking-tight">
                {s.value}
                <span className="text-xl ml-1">{s.unit}</span>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mt-3">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/MarketStats.tsx
git commit -m "feat: add MarketStats section"
```

---

### Task 7: 仕組みセクション

**Files:**
- Create: `src/components/business/HowItWorks.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/HowItWorks.tsx`:

```tsx
import { flowColumns } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="How it works" title="LINK Uの仕組み" />
        <p className="text-sm text-gray-500 -mt-8 mb-12">
          学生の人柄を知ってから、会って、つながる。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flowColumns.map((c, i) => {
            const highlight = i === 1;
            return (
              <div
                key={i}
                className={`rounded-lg p-6 ${
                  highlight ? "bg-brand text-white" : "border border-gray-200"
                }`}
              >
                <p
                  className={`font-medium mb-4 ${
                    highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {c.label}
                </p>
                <ul className="space-y-2">
                  {c.points.map((pt, j) => (
                    <li
                      key={j}
                      className={`text-sm leading-relaxed ${
                        highlight ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      ・{pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/HowItWorks.tsx
git commit -m "feat: add HowItWorks section"
```

---

### Task 8: 企業ができることセクション

**Files:**
- Create: `src/components/business/CompanyCapabilities.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/CompanyCapabilities.tsx`:

```tsx
import { capabilities } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function CompanyCapabilities() {
  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Features" title="企業ができること" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <span className="text-xs tracking-widest text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-medium text-gray-900 mt-2 mb-3">
                {c.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/CompanyCapabilities.tsx
git commit -m "feat: add CompanyCapabilities section"
```

---

### Task 9: 選ばれる理由セクション

**Files:**
- Create: `src/components/business/WhyChosen.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/WhyChosen.tsx`:

```tsx
import { reasons } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function WhyChosen() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Why LINK U" title="LINK Uが選ばれる理由" />
        <div className="space-y-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white p-8 md:flex md:gap-8">
              <div className="md:w-1/3">
                <span className="text-sm font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-medium text-gray-900 mt-1">
                  {r.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed md:w-2/3 mt-3 md:mt-0">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/WhyChosen.tsx
git commit -m "feat: add WhyChosen section"
```

---

### Task 10: 成果報酬0円バナー

**Files:**
- Create: `src/components/business/ZeroFeeBanner.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/ZeroFeeBanner.tsx`:

```tsx
import { zeroFee } from "@/lib/data/business";

export default function ZeroFeeBanner() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-brand rounded-2xl px-8 py-12 text-center">
          <p className="text-white/80 text-sm tracking-wide mb-2">
            {zeroFee.caption}
          </p>
          <p className="text-4xl md:text-5xl font-bold text-white">
            {zeroFee.title}
          </p>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            {zeroFee.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/ZeroFeeBanner.tsx
git commit -m "feat: add ZeroFeeBanner section"
```

---

### Task 11: 料金プランセクション

**Files:**
- Create: `src/components/business/PricingPlans.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/PricingPlans.tsx`:

```tsx
import Link from "next/link";
import { plans } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function PricingPlans() {
  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="Pricing" title="料金プラン" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-xl p-8 ${
                plan.popular ? "border-2 border-brand" : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 bg-brand text-white text-xs px-3 py-1 rounded-full">
                  一番人気
                </span>
              )}
              <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">{plan.target}</p>
              <p className="mb-6">
                <span className="text-4xl font-bold text-brand">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 ml-1">{plan.unit}</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start justify-between text-sm border-b border-gray-50 pb-2"
                  >
                    <span className="text-gray-700">{f.label}</span>
                    <span className="text-gray-500 text-xs ml-3 whitespace-nowrap">
                      {f.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-6">
          成果報酬は0円。年会費以外の費用はかかりません。
        </p>
        <div className="text-center mt-8">
          <Link
            href="#contact"
            className="inline-block px-7 py-3 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity"
          >
            プランについて相談する
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/PricingPlans.tsx
git commit -m "feat: add PricingPlans section"
```

---

### Task 12: 学生記事への誘導セクション

**Files:**
- Create: `src/components/business/StudentArticlesCTA.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/StudentArticlesCTA.tsx`:

```tsx
import Link from "next/link";

export default function StudentArticlesCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-3">
          Proof
        </span>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-wide leading-snug">
          まずは、学生たちの記事を読んでみてください。
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mt-4 max-w-2xl mx-auto">
          プロの取材でつくられた200名以上のストーリー。これが、貴社に届く「質の高い母集団」です。
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-7 py-3 text-sm font-medium text-brand border border-brand rounded-md hover:bg-brand hover:text-white transition-colors"
        >
          学生の記事を見る
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/StudentArticlesCTA.tsx
git commit -m "feat: add StudentArticlesCTA section"
```

---

### Task 13: 問い合わせセクション（Tally埋め込み＋mailtoフォールバック）

**Files:**
- Create: `src/components/business/ContactSection.tsx`

- [ ] **Step 1: コンポーネントを作成**

`src/components/business/ContactSection.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { CONTACT_EMAIL, operator } from "@/lib/data/business";

const TALLY_FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export default function ContactSection() {
  useEffect(() => {
    if (!TALLY_FORM_ID) return;
    const SRC = "https://tally.so/widgets/embed.js";
    const load = () => window.Tally?.loadEmbeds();
    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) {
      load();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.onload = load;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="contact"
      className="py-20 scroll-mt-20 bg-gray-50/60 border-t border-gray-100"
    >
      <div className="max-w-3xl mx-auto px-6">
        <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-3 text-center">
          Contact
        </span>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-wide text-center mb-4">
          お問い合わせ・ご相談
        </h2>
        <p className="text-sm text-gray-500 text-center leading-relaxed mb-10">
          サービス内容・料金・導入について、お気軽にご相談ください。
          <br />
          担当より折り返しご連絡いたします。
        </p>

        {TALLY_FORM_ID ? (
          <iframe
            data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
            loading="lazy"
            width="100%"
            height="500"
            title="お問い合わせフォーム"
            className="w-full"
          />
        ) : (
          <div className="text-center border border-dashed border-gray-300 rounded-lg p-10">
            <p className="text-sm text-gray-500 mb-4">
              お問い合わせは下記メールアドレスまでお願いいたします。
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity"
            >
              {CONTACT_EMAIL} にメールする
            </a>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          フォームが表示されない場合は{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline">
            {CONTACT_EMAIL}
          </a>{" "}
          までご連絡ください。
        </p>

        <div className="mt-14 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-500">
          <div>
            <p className="text-gray-900 font-medium">
              {operator.service.role}：{operator.service.company}
            </p>
            <p className="mt-1">TEL {operator.service.tel}</p>
            <p>{operator.service.email}</p>
          </div>
          <div>
            <p className="text-gray-900 font-medium">
              {operator.sales.role}：{operator.sales.company}
            </p>
            <p className="mt-1">TEL {operator.sales.tel}</p>
            <p>{operator.sales.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。`NEXT_PUBLIC_TALLY_FORM_ID` 未設定でも mailto フォールバックでビルド・表示が成立する。

- [ ] **Step 3: Commit**

```bash
git add src/components/business/ContactSection.tsx
git commit -m "feat: add ContactSection with Tally embed and mailto fallback"
```

---

### Task 14: 企業向けページの組み立て

**Files:**
- Create: `src/app/business/page.tsx`

- [ ] **Step 1: ページを作成**

`src/app/business/page.tsx`:

```tsx
import type { Metadata } from "next";
import BusinessHero from "@/components/business/BusinessHero";
import PainPoints from "@/components/business/PainPoints";
import MarketStats from "@/components/business/MarketStats";
import HowItWorks from "@/components/business/HowItWorks";
import CompanyCapabilities from "@/components/business/CompanyCapabilities";
import WhyChosen from "@/components/business/WhyChosen";
import ZeroFeeBanner from "@/components/business/ZeroFeeBanner";
import PricingPlans from "@/components/business/PricingPlans";
import StudentArticlesCTA from "@/components/business/StudentArticlesCTA";
import ContactSection from "@/components/business/ContactSection";

export const metadata: Metadata = {
  title: "企業の方へ | LINK U — 待つ採用から、声をかける採用へ",
  description:
    "新潟の学生200名以上のストーリー記事から、人柄を知って声をかける新しい採用。学生DB検索・スカウト・面談イベント・PR記事掲載。成果報酬0円。",
};

export default function BusinessPage() {
  return (
    <>
      <BusinessHero />
      <PainPoints />
      <MarketStats />
      <HowItWorks />
      <CompanyCapabilities />
      <WhyChosen />
      <ZeroFeeBanner />
      <PricingPlans />
      <StudentArticlesCTA />
      <ContactSection />
    </>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。出力に `/business` ルートが含まれる。

- [ ] **Step 3: Commit**

```bash
git add src/app/business/page.tsx
git commit -m "feat: add /business company landing page"
```

---

### Task 15: トップページの「記事一覧の後」に企業向け入口バンドを追加

> **方針:** トップの主役は学生記事。企業バンドは記事一覧の **後ろ** に置き、文言も「まず記事を読ませる」方向にする（記事より先に営業を出さない）。

**Files:**
- Create: `src/components/home/CompanyBand.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: バンドコンポーネントを作成**

`src/components/home/CompanyBand.tsx`:

```tsx
import Link from "next/link";

export default function CompanyBand() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-2">
            For Companies
          </span>
          <p className="text-lg md:text-xl font-medium text-gray-900 leading-snug">
            採用ご担当者の方へ。記事を読んで、気になる学生に会いに行けます。
          </p>
          <p className="text-sm text-gray-500 mt-2">
            新潟の学生と出会う、新しい採用のかたち。
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/business"
            className="px-5 py-2.5 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            企業の方へ
          </Link>
          <Link
            href="/business#contact"
            className="px-5 py-2.5 text-sm font-medium text-brand border border-brand rounded-md hover:bg-brand hover:text-white transition-colors whitespace-nowrap"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: トップページの記事一覧の後に挿入**

`src/app/page.tsx` を以下に置き換える（`CompanyBand` は `SearchableArticleGrid` の **後**）:

```tsx
import HeroSection from "@/components/home/HeroSection";
import CompanyBand from "@/components/home/CompanyBand";
import SearchableArticleGrid from "@/components/home/SearchableArticleGrid";
import { people } from "@/lib/data/people";
import { getAllArticles } from "@/lib/content";

export default function Home() {
  const articles = getAllArticles();
  return (
    <>
      <HeroSection people={people} articles={articles} />
      <SearchableArticleGrid articles={articles} people={people} />
      <CompanyBand />
    </>
  );
}
```

- [ ] **Step 3: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 4: Commit**

```bash
git add src/components/home/CompanyBand.tsx src/app/page.tsx
git commit -m "feat: add company entry band to home page"
```

---

### Task 16: ヘッダーに「企業の方へ」リンクを追加

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: デスクトップナビにリンクを追加**

`src/components/layout/Header.tsx` のデスクトップナビ `<nav className="hidden md:flex ...">` 内、「タグ」リンク（`</Link>` で閉じる3つ目）の直後に以下を追加する:

```tsx
          <Link
            href="/business"
            className="text-sm font-medium text-brand hover:opacity-70 transition-opacity tracking-wide"
          >
            企業の方へ
          </Link>
```

- [ ] **Step 2: モバイルメニューにリンクを追加**

同ファイルのモバイルメニュー `{menuOpen && ( ... )}` 内、「タグ」リンク（`onClick={() => setMenuOpen(false)}` を持つ3つ目の `</Link>`）の直後に以下を追加する:

```tsx
          <Link
            href="/business"
            className="text-sm font-medium text-brand tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            企業の方へ
          </Link>
```

- [ ] **Step 3: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add company link to header nav"
```

---

### Task 17: フッターに企業導線と運営者情報を追加

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: フッターを置き換える**

`src/components/layout/Footer.tsx` を以下に置き換える:

```tsx
import Link from "next/link";
import { operator } from "@/lib/data/business";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <span className="text-lg font-bold tracking-[0.25em] text-gray-900">
              LINK U
            </span>
            <p className="text-xs text-gray-400 tracking-wide mt-2">
              履歴書に書けないこと。そこに、会いたい理由がある。
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              インタビュー一覧
            </Link>
            <Link
              href="/business"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              企業の方へ
            </Link>
            <Link
              href="/business#contact"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>

          <div className="text-xs text-gray-400 leading-relaxed">
            <p>
              {operator.service.role}：{operator.service.company}
            </p>
            <p>
              {operator.sales.role}：{operator.sales.company}
            </p>
            <p className="mt-1">{operator.site}</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 mt-10">
          © {new Date().getFullYear()} LINK U. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add company links and operator info to footer"
```

---

### Task 18: 環境変数の手順をREADMEに追記

**Files:**
- Modify: `README.md`

- [ ] **Step 1: READMEにセットアップ手順を追記**

`README.md` の末尾に以下のセクションを追記する:

```markdown
## お問い合わせフォーム（Tally）の設定

`/business` ページの問い合わせフォームは Tally の埋め込みを使用します。

1. [Tally](https://tally.so) でフォームを作成（例：会社名／ご担当者名／メール／電話／希望プラン／相談内容）
2. フォームの通知先メールを `company@be-u.co.jp` に設定
3. フォームID（`https://tally.so/r/XXXXXX` の `XXXXXX`）を環境変数に設定：

   ```bash
   # .env.local
   NEXT_PUBLIC_TALLY_FORM_ID=XXXXXX
   ```

   本番（Vercel 等）では同名の環境変数を設定する。

未設定の場合、フォーム枠の代わりに `company@be-u.co.jp` へのメールリンクが表示される（ページは壊れない）。
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add Tally form setup instructions"
```

---

### Task 19: 最終検証（ビルド・Lint・目視）

**Files:** なし（検証のみ）

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: エラーなし（warning は許容）。

- [ ] **Step 2: 本番ビルド**

Run: `npm run build`
Expected: 成功。ルート一覧に `/` と `/business` が表示される。

- [ ] **Step 3: 開発サーバーで目視確認**

Run: `npm run dev`（別ターミナル）、ブラウザで確認:
- `http://localhost:3000/` — 学生記事が主役のまま表示され、**記事一覧の後ろ**に控えめな企業バンドが出る。ボタンが `/business`・`/business#contact` に遷移
- `http://localhost:3000/business` — 10セクションが順に表示。料金（15万/30万）・成果報酬0円が記載どおり
- `/business` の各CTA「お問い合わせ・ご相談」「プランについて相談する」クリックで `#contact` までスクロール
- 問い合わせ：`NEXT_PUBLIC_TALLY_FORM_ID` 未設定なら mailto フォールバックが表示される（`mailto:company@be-u.co.jp`）
- ヘッダー（PC/モバイル）に「企業の方へ」、フッターに企業導線＋運営者情報
- ブラウザ幅を縮めてモバイル表示でレイアウト崩れがないこと

- [ ] **Step 4: 確認結果を記録**

目視確認で問題があれば、該当タスクに戻って修正・再コミット。問題なければ完了。

---

## Self-Review（記入済み）

**1. Spec coverage:**
- §6.1 ルーティング → Task 14（`/business`＋metadata）、Task 13（`#contact`）
- §6.2 各セクション → Task 4〜13
- §6.3 トップ追加（CompanyBand） → Task 15
- §6.4 ヘッダー/フッター → Task 16, 17
- §5 デザイン（ブランド色） → Task 1
- §7 データモデル → Task 2
- §8 Tally埋め込み＋mailto＋env → Task 13, 18
- §9 デプロイ影響（env） → Task 18
- §10 エラーハンドリング（フォールバック） → Task 13
- §11 検証 → Task 19
- ギャップなし。

**2. Placeholder scan:** 全ステップに実コードまたは具体コマンドを記載。TBD/TODO/「適切に処理」等は無し。

**3. Type consistency:** `business.ts` で定義した `businessHero`(titleTop/titleBottom/lead/eyebrow)、`marketStats`(value/unit/label/note)、`flowColumns`(label/points)、`capabilities`(title/desc)、`reasons`(title/desc)、`zeroFee`(caption/title/desc)、`plans`(name/price/unit/target/features{label,note}/popular)、`operator`(service/sales{role,company,tel,email}, site)、`CONTACT_EMAIL` を各コンポーネントで同名参照。`SectionHeading` の props（eyebrow/title/centered）は呼び出し側と一致。`window.Tally.loadEmbeds` の型宣言と使用が一致。整合済み。
