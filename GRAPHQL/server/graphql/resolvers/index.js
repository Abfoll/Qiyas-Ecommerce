const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
  },
  Mutation: {
    _empty: () => 'placeholder',
  },
};

module.exports = resolvers;