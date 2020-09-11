import React, { useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "@react-firebase/database"
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

function QuotesSearch(props) {
  const [searchTerms, setSearchTerms] = useState('')
  const [showResults, setShowResults] = useState(false)
  const quotes = props.quotes || []
  const onSubmit = e => {
    e.preventDefault()
    setShowResults(true)
  }
  const onChange = e => {
    setSearchTerms(e.target.value)
    if (searchTerms.length > 3) setShowResults(true)
    else setShowResults(false)
  }
  return (
    <form onSubmit={onSubmit}>
      <Autocomplete
        id="search"
        options={[...new Set(quotes.map((q) => q.labels).flat())]}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) =>
            <TextField {...params} label="Buscar..." value={searchTerms} onChange={onChange} variant="filled" />
        } />
      {(showResults) ? quotes.filter(q => q.value.includes(searchTerms) || q.labels.find(l => l.includes(searchTerms))).map((q, i) => <p key={i}>{q.value}</p>) : ''}
    </form>
  )
}

export default function Home() {
  return (
    <FirebaseDatabaseProvider firebase={firebase}>
      <div>
        <FirebaseDatabaseNode
          path="quotes/">
          {data => <QuotesSearch quotes={data.value}/>}
        </FirebaseDatabaseNode>
      </div>
    </FirebaseDatabaseProvider>
  )
}
