import React,{useState,useEffect,} from 'react'
import { Search, Container, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Order.css'

export const StoreSearchBar = (props) => {

    const [store,setStore] = useState([])
    const [result,setResult] = useState([])
    const [value,setValue] = useState('')
    
    const fecthStore = async () => {
        let list = []
        const response = await fetch('http://localhost:3000/store')
        const data = await response.json()
        await data.map( stores =>{
            list.push({
                title:stores.name
            })
        })
        setStore(list)
    }

    const handleResultSelect = (e,{result}) => {
        props.rerenderParentCallback(result.title)
        setValue(result.title)
    }

    const handleSearchChange = async (e,{value}) => {
        setValue(value)
        if(value.length < 1) return setResult(store)
        const resultFromSearch = store.filter( data => {
            return data.title.match(value)
        })
        return setResult(resultFromSearch)
    }


    useEffect(()=>{
        fecthStore()
    },[])

    return(
        <Search
            as={Input}
            className='SearchBar'
            results={result}
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            value={value}   
        />
    )
}