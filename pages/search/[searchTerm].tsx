import "./searchTerm.css"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Search(initialData) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Search</title>
        <meta
          name="description"
          content={initialData.giphys.map((each) => each.title + " ")}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>
        <span>Go</span>
        <Link href="/">&nbsp;home</Link>
      </p>
      <h1>Search results for: {router.query.searchTerm}</h1>
      <div className="giphy-search-results-grid">
        {initialData.giphys.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm
  let giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`
  )
  giphys = await giphys.json()
  return { props: { giphys: giphys["data"] } }
}
