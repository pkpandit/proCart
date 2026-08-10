interface TitlePageProps {
  page_title: string;
  page_description: string[];
}
const TitlePage = ({ page_title, page_description }: TitlePageProps) => {
  return (
    <div className="flex flex-col gap-y-2 ">
      <h1 className="text-2xl/7 font-semibold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">
        {page_title}
      </h1>
      <ul className="text-gray-600 text-sm sm:text-base grid grid-cols-3 gap-x-6 gap-y-2   ">
        {page_description.map((desc, index) => (
          <li className="bg-gray-100 p-4 rounded-sm" key={index}>
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TitlePage;
