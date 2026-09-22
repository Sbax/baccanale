import { redirect } from "next/navigation";
import { latestYear } from "../lib/baccanale";

const YearIndexPage = () => {
  redirect(`/year/${latestYear}`);
};

export default YearIndexPage;
