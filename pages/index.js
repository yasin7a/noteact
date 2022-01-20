import Head from "next/head";

import Note from "../components/Note";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Note App</title>
      </Head>

      <div id="outer-container">
        <div className="note-app min-h-[96vh]">
          <main id="page-wrap">
            <Note />
          </main>
        </div>
        <footer>
          <p className="text-center text-white mt-8">
            Developed by
            <Link href="https://www.linkedin.com/in/yasin-arafath-80ab22207/">
              <a className="text-orange-400 hover:text-orange-600">
                {" "}
                Yasin Arafath
              </a>
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}
