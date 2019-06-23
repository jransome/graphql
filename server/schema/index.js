const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = require('graphql');

const Film = require('../models/film');
const Crew = require('../models/crew');

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: GraphQLInt },
    name: { type: GraphQLString },
    crew: {
      type: CrewType,
      resolve(parent) {
        // parent is the queried film 
        return Crew.findById(parent.crewId);
      },
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
    films: {
      type: new GraphQLList(FilmType),
      resolve(parent) {
        return Film.find({ crewId: parent.id });
      },
    },
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
        return Film.findById(args.id);
      },
    },
    crew: {
      type: CrewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db or somewhere
        return Crew.findById(args.id);
      }
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: () => Film.find({}),
    },
    crews: {
      type: new GraphQLList(CrewType),
      resolve: () => Crew.find({}),
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCrew: {
      type: CrewType,
      args: {
        name: { type: GraphQLString },
        captain: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Crew.create({
          name: args.name,
          captain: args.captain,
        })
      }
    },
    addFilm: {
      type: FilmType,
      args: {
        name: { type: GraphQLString },
        number: { type: GraphQLInt },
        crewId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Film.create({
          name: args.name,
          number: args.number,
          crewId: args.crewId,
        })
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
