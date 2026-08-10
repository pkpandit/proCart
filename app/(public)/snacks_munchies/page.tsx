import TitlePage from "@/components/page-title/TitlePage";

const snacks_munchies = () => {
  return (
    <header className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <TitlePage
        page_title="Snacks & Munchies"
        page_description={[
          "Features comfort foods such as potato chips, pretzels, gourmet popcorn, trail mixes, and chocolate treats.",
          "Targets high-margin impulse buying, encouraging customers to add items to their cart right before checkout.",
          "Offers long shelf-life products that are easy to store in warehouse inventories and ship in bulk packages.",
        ]}
      />
    </header>
  );
};

export default snacks_munchies;
