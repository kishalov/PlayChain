import { TopAdsCarousel } from "@/components/top-ads-carousel";
import { SearchInput } from "@/components/search";
import { ContactsFeed } from "@/components/feed";
import { getContacts } from "@/lib/getContacts";
import { FloatingBurgerButton } from "@/components/floating-burger-button";
import { ContactsSearchFeed } from "@/components/ContactsSearchFeed";

export default async function HomePage() {
  const contacts = await getContacts();

  return (
    <main className="w-full min-h-screen pb-24"> {/* запас для кнопки */}
      {/* <SearchInput />
      <TopAdsCarousel />
      <ContactsFeed contacts={contacts} />
      <FloatingBurgerButton /> */}
      <ContactsSearchFeed contacts={contacts} />
    </main>
  );
}
