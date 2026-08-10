import TitlePage from "@/components/home/TitlePage";

const chicken_meat_fish = () => {
  return (
    <header className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <TitlePage
        page_title="Chicken, Meat & Fish"
        page_description={[
          "Offers fresh, raw protein selections including tender chicken cuts, premium meats, and fresh seafood.",
          "Commands high transactional values per order, significantly boosting overall website revenue.",
          "Focuses on premium, hygienic, vacuum-sealed packaging and strict cold-chain logistics to maintain quality.",
        ]}
      />
    </header>
  );
};

export default chicken_meat_fish;
