import {useEffect, useState} from 'react';
import {useDebounce} from '@/app/hooks/useDebounce';
import {useFetcher} from '@/app/hooks/useFetcher';


export default function SearchTagBox(props) {
  const {input,path,pushTag} = props;
  const [url, setUrl] = useState(path + '?q=');
  const {data, error, isLoading} = useFetcher(url);
  const debouncedSearchTerm = useDebounce(input, 1000);
  useEffect(() => {
    setUrl(path + '?q=' + input);
  }, [debouncedSearchTerm]);
  return (
    <>
    {

       <div>
          <h2>{input ? `Results for "${input}"` : 'Select a tag'}</h2>

          {
          (isLoading && !error) ? (<div>Loading...</div>) :
            (error ? <div>Failed to load</div> :
            (data &&
              <ul>
              {
               data.map(item=> <li onClick={()=>pushTag(item.attributes.name)} key={item.attributes.name}>{item.attributes.name}</li>)
              }
            </ul> ) ||  'Not found')
        }
       </div>
    }
     </>
  );
}