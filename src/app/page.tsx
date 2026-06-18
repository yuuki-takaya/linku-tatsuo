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
