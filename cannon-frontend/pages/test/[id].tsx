import type { NextPage } from "next";
import { useRouter } from "next/router";

const QueryIdPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <> Helo world {id} </>
  );
};

export default QueryIdPage;
