import { Models } from 'appwrite'
import Loader from './Loader'
import GridPostList from './GridPostList'

type SearchResultProps={
    isSEARCHFetching: boolean;
    searchedPosts: Models.Document[];
}
//@ts-ignore
const SearchResults = ({ isSearchFetching , searchedPosts}:
    SearchResultProps) => {
        if(isSearchFetching) return <Loader/>
 
        if(searchedPosts && searchedPosts.document.length > 0)
        {
            return (
                <GridPostList posts={searchedPosts.document}/>
                )
        }

    return(
        <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    )
 
}

export default SearchResults