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
    "学生200名以上のストーリー記事から、人柄を知って声をかける新しい採用。学生DB検索・スカウト・面談イベント・PR記事掲載。成果報酬0円。",
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
