import Image from 'next/image'
import Link from 'next/link';

interface HomeProps {}
const Home: React.FC = (props: HomeProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {/* Top Header */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          href={"/test/priyam"}
        >
          Create new&nbsp;
          <code className="font-mono font-bold">Test </code>
        </Link>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex items-end gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/prashantkhandelwal/cannon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="mb-0.5"> By </p> {' '} <h2 className="text-2xl font-bold"> Team Cannon </h2>
          </a>
        </div>
      </div>

    </main>
  )
}

export default Home;
