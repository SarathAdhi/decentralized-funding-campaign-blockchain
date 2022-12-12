import { PageLayout } from "@layouts/PageLayout";
import { ViewHome } from "@modules/Home";

const HomePage = () => {
  return (
    <PageLayout title="" className="flex flex-col items-center">
      <ViewHome />
    </PageLayout>
  );
};

export default HomePage;
