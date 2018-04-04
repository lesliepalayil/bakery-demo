import { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

import items from './data/items.json'

const IngredientsType = new GraphQLObjectType({
    name: "Ingredient",
    description: "",
    fields: () => ({
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        quantity: { type: GraphQLFloat },
        units: { type: GraphQLString }
    })
});

const ItemType = new GraphQLObjectType({
    name: "ItemType",
    description: "",
    fields: () => ({
        id: { type: GraphQLString }, 
        name:  { type: GraphQLString },
        type:  { type: GraphQLString },
        quantity:  { type: GraphQLFloat },
        ingredients:  { type: new GraphQLList(IngredientsType) }
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'BakeryItem',
        description: 'Bakery Item',
        fields: () => ({
            item: {
                type: ItemType,
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve: (root, args) => {
                    return items.data.filter(item => item.id===args.id)[0];
                }
            }
        })
    })
});

export default schema;