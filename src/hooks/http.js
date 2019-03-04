import { useState, useEffect } from 'react' 

export const useHttp = (url, dependencies) => {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    // fetch('https://swapi.co/api/people')
    useEffect(() => {
        setLoading(true);
        console.log(`Sending http request to ${url}`)
        fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch.');
          }
          return response.json();
        })
        .then(charData => {

            setLoading(false);
            setData(charData)
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, dependencies) 

    return [isLoading, data]
}