import { TopAdsCarousel } from "@/components/top-ads-carousel";
import { TopTagsCarousel } from "@/components/tags";
import { SearchInput } from "@/components/search";
import { ContactsFeed } from "@/components/feed";

export default function HomePage() {
	return (
		<main className="w-full min-h-screen">
      <SearchInput />
			<TopAdsCarousel />
      <TopTagsCarousel />
      <ContactsFeed />
		</main>
	);
}
