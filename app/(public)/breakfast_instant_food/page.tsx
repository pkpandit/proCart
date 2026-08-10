import TitlePage from "@/components/page-title/TitlePage";

const breakfast_instant_food = () => {
  return (
    <header className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <TitlePage
        page_title="Breakfast & Instant Food"
        page_description={[
          "Curates quick-cook items like breakfast cereals, instant noodles, oatmeal, pancake mixes, and ready-to-eat meals.",
          "Appeals directly to busy professionals and students seeking high convenience and minimal cooking time.",
          "Encourages recurring monthly subscriptions and automatic restocking lists for household pantries.",
        ]}
      />
    </header>
  );
};

export default breakfast_instant_food;
