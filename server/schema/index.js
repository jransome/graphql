const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = require('graphql');
const _ = require('lodash');

// fake data
const films = [
  { id: '1', number: 1, name: 'The Motion Picture', crewId: '1' },
  { id: '2', number: 2, name: 'The Wrath of Khan', crewId: '1' },
  { id: '3', number: 3, name: 'The Search for Spock', crewId: '1' },
  { id: '4', number: 4, name: 'The Voyage Home', crewId: '1' },
  { id: '5', number: 5, name: 'The Final Frontier', crewId: '1' },
  { id: '6', number: 6, name: 'The Undiscovered Country', crewId: '1' },
  { id: '7', number: 7, name: 'Generations', crewId: '2' },
  { id: '8', number: 8, name: 'First Contact', crewId: '2' },
  { id: '9', number: 9, name: 'Insurrection', crewId: '2' },
  { id: '10', number: 10, name: 'Nemesis', crewId: '2' },
]

const crews = [
  { id: '1', name: 'The Original Series', captain: 'James T. Kirk', ships: ['USS Enterprise NCC-1701', 'USS Enterprise NCC-1701-A'] },
  { id: '2', name: 'The Next Generation', captain: 'Jean-luc Picard', ships: ['USS Enterprise NCC-1701-D', 'USS Enterprise NCC-1701-E'] },
]

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: GraphQLInt },
    name: { type: GraphQLString },
    crew: {
      type: CrewType,
      resolve(parent, args) {
        // parent is the queried film 
        return _.find(crews, { id: parent.crewId })
      }
    },
  }),
});

const CrewType = new GraphQLObjectType({
  name: 'Crew',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    captain: { type: GraphQLString },
    ships: { type: new GraphQLList(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    film: {
      type: FilmType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db or somewhere
        return _.find(films, { id: args.id })
      }
    },
    crew: {
      type: CrewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db or somewhere
        return _.find(crews, { id: args.id })
      }
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
