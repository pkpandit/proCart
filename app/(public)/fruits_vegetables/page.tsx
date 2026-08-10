import TitlePage from "@/components/page-title/TitlePage";

const fruits_vegetables = () => {
  return (
    <header className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <TitlePage
        page_title="Fruits & Vegetables"
        page_description={[
          "Delivers fresh seasonal farm produce, organic leafy greens, root vegetables, and exotic cooking herbs.",
          "Serves as the ultimate metric for store quality, where visual appeal and freshness establish customer trust.",
          "Utilizes dynamic daily pricing strategies to match market rates and offer competitive values on kitchen staples.",
        ]}
      />
    </header>
  );
};
export default fruits_vegetables;
