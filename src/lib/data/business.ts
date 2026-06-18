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

export const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScNIX_WzT5cD5WyZN4qemNgVOcSk5eiYEcF78AcCeAkQZ6xCw/viewform?embedded=true";

export const businessHero = {
  eyebrow: "企業の経営者・採用ご担当者様へ",
  titleTop: "待つ採用から、",
  titleBottom: "声をかける採用へ。",
  lead: "LINK Uには、200名以上の学生のストーリー記事が集まっています。記事で人となりを知ってから、気になる学生へ採用オファー。出会いをその場限りで終わらせない、新しい採用の仕組みです。",
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
