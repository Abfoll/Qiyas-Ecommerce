import { userResolvers } from "./userResolvers.js";
import { categoryResolvers } from "./categoryResolvers.js";
import { productResolvers } from "./productResolvers.js";

function mergeResolvers(resolverObjects) {
  const merged = {};
  for (const resolvers of resolverObjects) {
    for (const typeName of Object.keys(resolvers)) {
      merged[typeName] = { ...(merged[typeName] || {}), ...resolvers[typeName] };
    }
  }
  return merged;
}

export const resolvers = mergeResolvers([userResolvers, categoryResolvers, productResolvers]);