export interface FoodAPI {
    swagger:     string;
    info:        Info;
    schemes:     string[];
    host:        string;
    tags:        Tag[];
    paths:       Paths;
    definitions: Definitions;
}

export interface Definitions {
    Ingredients: Ingredients;
    List:        List;
}

export interface Ingredients {
    type:       string;
    properties: IngredientsProperties;
}

export interface IngredientsProperties {
    quantity:   FoodID;
    measureURI: FoodID;
    foodID:     FoodID;
}

export interface FoodID {
    type: string;
}

export interface List {
    type:       string;
    properties: ListProperties;
}

export interface ListProperties {
    ingredients: IngredientsClass;
}

export interface IngredientsClass {
    type:  Type;
    items: SchemaClass;
}

export interface SchemaClass {
    $ref: string;
}

export enum Type {
    Array = "array",
    Integer = "integer",
    String = "string",
}

export interface Info {
    version:     string;
    title:       string;
    description: string;
}

export interface Paths {
    "/api/food-database/v2/parser":    APIFoodDatabaseV2Parser;
    "/api/food-database/v2/nutrients": APIFoodDatabaseV2Nutrients;
    "/auto-complete":                  AutoComplete;
    "/api/menu-items/v2/search":       APIMenuItemsV2Search;
}

export interface APIFoodDatabaseV2Nutrients {
    post: Post;
}

export interface Post {
    tags:        string[];
    summary:     string;
    description: string;
    consumes:    string[];
    parameters:  PostParameter[];
    responses:   { [key: string]: Response };
}

export interface PostParameter {
    name:                      string;
    in:                        string;
    "x-data-threescale-name"?: string;
    description:               string;
    required?:                 boolean;
    type?:                     Type;
    schema?:                   SchemaClass;
}

export interface Response {
    description: string;
}

export interface APIFoodDatabaseV2Parser {
    get: APIFoodDatabaseV2ParserGet;
}

export interface APIFoodDatabaseV2ParserGet {
    tags:        string[];
    summary:     string;
    description: string;
    parameters:  PurpleParameter[];
    responses:   { [key: string]: Response };
}

export interface PurpleParameter {
    name:                      string;
    in:                        In;
    "x-data-threescale-name"?: string;
    description:               string;
    required?:                 boolean;
    type:                      Type;
    default?:                  string;
    enum?:                     string[];
    collectionFormat?:         string;
    uniqueItems?:              boolean;
    items?:                    PurpleItems;
}

export enum In {
    Query = "query",
}

export interface PurpleItems {
    type: Type;
    enum: string[];
}

export interface APIMenuItemsV2Search {
    get: APIFoodDatabaseV2ParserGet;
}

export interface AutoComplete {
    get: AutoCompleteGet;
}

export interface AutoCompleteGet {
    tags:        string[];
    summary:     string;
    description: string;
    parameters:  PostParameter[];
    responses:   Responses;
}

export interface Responses {
    "200": Response;
}

export interface Tag {
    name: string;
}
