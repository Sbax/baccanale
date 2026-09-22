import { redirect } from "next/navigation";
import { latestYear } from "../lib/baccanale";

const About = () => {
  redirect(`/year/${latestYear}`);
};

export default About;
