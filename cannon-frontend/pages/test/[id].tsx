import Test from "@/components/test";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const QueryIdPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <Test id={id} />
  );
};

export default QueryIdPage;
