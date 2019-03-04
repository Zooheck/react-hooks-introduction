import React, { useEffect } from 'react';
import { ustHttp, useHttp } from '../hooks/http'
import Summary from './Summary';

const Character = props => {

  const [isLoading, charData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar])

  let loadedCharacter = null;

  if(charData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: charData.name,
      height: charData.height,
      colors: {
        hair: charData.hair_color,
        skin: charData.skin_color
      },
      gender: charData.gender,
      movieCount: charData.films.length
    };
  }
 
  

  // THIS REPLACES COMPONENTWILLUNMOUNT, AND ONLY RENDERS WHEN THE 'DESTROY' BUTTON IS CLICKED
  useEffect(() => {
    return () => {
      console.log('Component did unmount')
    }
  })


    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

// React.memo() replaces shouldComponentUpdate()
// NOTE: This can take an optional second parameter. You can add
// a function which takes prevProps and nextProps as arguments.
// If this function returns true, the component will NOT re-render.
// If the function returns false, the component WILL re-render.
// Only use this optional second function if you have props that
// might change but you don't want to trigger a re-render.
export default React.memo(Character);