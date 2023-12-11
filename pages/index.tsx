import "./index.css"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import Footer from "./components/footer"

type SearchResult = {
  title: string
  images: {
    original: {
      url: string
    }
  }
}
// the initial data will be injected by getStaticProps
export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("cats")
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([])
  useEffect(() => {
    setSearchResults(initialData.catGiphys.data)
  }, [initialData])

  const search = async (event) => {
    event.preventDefault()
    let giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`
    )
    giphys = await giphys.json()
    console.log(giphys)

    setSearchResults(giphys["data"])
    setSearchTerm(formInputs)
    setFormInputs("")
  }
  const handleInputs = (e) => {
    let { value } = e.target
    setFormInputs(value)
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Giphy Search App</h1>

      <form onSubmit={search}>
        <input
          name="searchTerm"
          onChange={handleInputs}
          value={formInputs}
          type="text"
          required
        />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <p>
        Share this search with others:&nbsp;
        <Link href={`/search/${searchTerm}`}>
          {`http://localhost:3000/search/${searchTerm}`}
        </Link>
      </p>

      <div className="giphy-search-results-grid">
        {searchResults.map((each: SearchResult, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

// the method name getStaticProps is assigned by default
export async function getStaticProps() {
  // Using getServerSideProps to using server side rendering.
  // export async function getServerSideProps() {
  let catGiphys = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=cats&api_key=1RgLqiavLHOYKyvQZYqLaZJIkZePtU5p&limit=10"
  )
  catGiphys = await catGiphys.json() // convert to json object.
  return { props: { catGiphys: catGiphys } }
}
