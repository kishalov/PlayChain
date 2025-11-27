import { TopAdsCarousel } from "@/components/top-ads-carousel";
import { TopTagsCarousel } from "@/components/tags";
import { SearchInput } from "@/components/search";
import { ContactsFeed } from "@/components/feed";
import { getContacts } from "@/lib/getContacts";

export default async function HomePage() {
    const contacts = await getContacts();
	return (
		<main className="w-full min-h-screen">
      <SearchInput />
			<TopAdsCarousel />
      <TopTagsCarousel />
      <ContactsFeed contacts={contacts} />
		</main>
	);
}
