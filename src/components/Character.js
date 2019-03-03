import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = props => {
  // state = { loadedCharacter: {}, isLoading: false };
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setLoading] = useState(false);
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== loadedCharacter.id ||
  //     nextState.isLoading !== isLoading
  //   );
  // }
  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setLoading(true);
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
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
        setLoading(false);
        setLoadedCharacter(loadedCharacter)
      })
      .catch(err => {
        console.log(err);
        setLoading(false)
      });
  };
  
  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }
  // useEffect(() => {
  //   fetchData();
  // }, [])

  // THE FOLLOWING REPLACES COMPONENTDIDUPDATE AND COMPONENTDIDMOUNT
  useEffect(() => {
    fetchData();
    // THE FOLLOWING FUNCTION IS OPTIONAL: IT EXECUTES BEFORE THE COMPONENT RE-RENDERS
    return () => {
      console.log("Cleaning up...")
    };
  }, [props.selectedChar])

  // THIS REPLACES COMPONENTWILLUNMOUNT, AND ONLY RENDERS WHEN THE 'DESTROY' BUTTON IS CLICKED
  useEffect(() => {
    return () => {
      console.log('Component did unmount')
    }
  })
  // componentDidMount() {
  //   this.fetchData();
  // }


  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }


    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
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
    } else if (!isLoading && !loadedCharacter.id) {
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