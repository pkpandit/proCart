import TitlePage from "@/components/home/TitlePage";

const bakery_biscuits = () => {
  return (
    <header className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <TitlePage
        page_title="Bakery & Biscuits"
        page_description={[
          "Showcases freshly baked croissants, sweet rolls, tea cakes, healthy digestive cookies, and crackers.",
          "Partners with local bakery suppliers to offer fresh-daily local delights alongside popular national brands.",
          "Leverages high-quality, appetising photography to tempt users and increase organic search click-through rates.",
        ]}
      />
    </header>
  );
};

export default bakery_biscuits;
