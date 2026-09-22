import { redirect } from "next/navigation";
import { latestYear } from "./lib/baccanale";

const Home = () => {
  redirect(`/year/${latestYear}`);
};

export default Home;
