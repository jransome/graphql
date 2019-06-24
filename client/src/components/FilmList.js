import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'

const getFilmsQuery = gql`
  {
    films {
      name
      id
    }
  }
`

function FilmList() {
  console.log(this.props)
  return (
    <div>
      <ul id="film-list">
        <li>Film name</li>
      </ul>
    </div>
  );
}

// binds the query to this component
export default graphql(getFilmsQuery)(FilmList);
