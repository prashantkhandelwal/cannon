import { IHomeTest } from "@/types/globalTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../layout/footer";
import Layout from "../layout";

interface HomeProps { }
const Home: React.FC<HomeProps> = (props) => {
  const { } = props;

  const [testIds, setTestIds] = useState<IHomeTest[]>([]);
  const newTestLink = "/test/priyam";

  useEffect(() => {
    // Have some dummy test data
    const testData1: IHomeTest = {
      id: "priyam",
      lastRun: new Date(),
    }
    const testData2: IHomeTest = {
      id: "priyam2",
      lastRun: new Date(),
    }

    setTestIds([testData1, testData2]);
  }, []);

  return (
    <Layout>

      {/* Top Header */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h2
          className="flex justify-center text-2xl"
        >
          Test History
        </h2>
        <Link
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          href={newTestLink}
        >
          Create new&nbsp;
          <code className="font-mono font-bold">Test </code>
        </Link>
      </div>

      {/* List of Test Ids will come here */}
      {testIds.length > 0 ?
        <div className="flex flex-col gap-4 flex-1 w-full mt-8">
          {testIds.map((test, ind) => {
            return (
              <Link
                href={`/test/${test.id}`}
                key={ind}
                className="flex flex-row justify-between items-center w-full bg-white px-3 py-2 rounded-md"
              >
                <p className="text-lg"> {test.id} </p>
                <div className="text-xs"> <span className="font-medium"> Last run: </span> {test.lastRun.toDateString()} </div>
              </Link>
            )
          })}
        </div> :
        <div className="flex flex-col gap-2 flex-1 justify-center items-center">
          <h1 className="text-5xl"> No Tests Found </h1>
          <p className="text-xl"> Start by Creating a
            <Link className="text-sky-400" href={newTestLink}> New Test </Link>
          </p>
        </div>
      }
    </Layout>
  )
}

export default Home;
