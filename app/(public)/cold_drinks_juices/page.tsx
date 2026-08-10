import TitlePage from "@/components/page-title/TitlePage";

const cold_drinks_juices = () => {
  return (
    <header className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <TitlePage
        page_title="Cold Drinks & Juices"
        page_description={[
          "Stocks carbonated sodas, mineral waters, natural fruit juices, iced coffees, and energy drinks.",
          "Experiences high sales velocity, particularly during seasonal peaks and social events requiring bulk beverages.",
          "Maximizes average order value by grouping items into convenient multi-packs and offering chilled delivery options.",
        ]}
      />
    </header>
  );
};

export default cold_drinks_juices;
