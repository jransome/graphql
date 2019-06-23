const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');
const _ = require('lodash')

// fake data
const films = [
  { id: '1', number: 1, name: 'The Motion Picture', crew: 'TOS' },
  { id: '2', number: 2, name: 'The Wrath of Khan', crew: 'TOS' },
  { id: '3', number: 3, name: 'The Search for Spock', crew: 'TOS' },
  { id: '4', number: 4, name: 'The Voyage Home', crew: 'TOS' },
  { id: '5', number: 5, name: 'The Final Frontier', crew: 'TOS' },
  { id: '6', number: 6, name: 'The Undiscovered Country', crew: 'TOS' },
  { id: '7', number: 7, name: 'Generations', crew: 'TNG' },
  { id: '8', number: 8, name: 'First Contact', crew: 'TNG' },
  { id: '9', number: 9, name: 'Insurrection', crew: 'TNG' },
  { id: '10', number: 10, name: 'Nemesis', crew: 'TNG' },
]

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    id: { type: GraphQLString },
    number: { type: GraphQLInt },
    name: { type: GraphQLString },
    crew: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    film: {
      type: FilmType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db or somewhere
        return _.find(films, { id: args.id })
      }
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
