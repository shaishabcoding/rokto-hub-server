import { FilterQuery, Query } from "mongoose";

/**
 * Interface for query parameters.
 * Used to handle query parameters for filtering, searching, sorting, pagination, and selecting fields.
 */
export type QueryParams = {
  searchTerm?: string;
  sort?: string;
  limit?: string | number;
  page?: string | number;
  fields?: string;
  [key: string]: unknown;
};

/**
 * Class to build and execute MongoDB queries based on query parameters.
 * Handles search, filtering, sorting, pagination, and field selection for a given model query.
 */
class QueryBuilder<T> {
  /**
   * Creates an instance of QueryBuilder.
   *
   * @param modelQuery - The query object for the mongoose model to be manipulated.
   * @param query - The query parameters to build the query.
   */
  constructor(public modelQuery: Query<T[], T>, public query: QueryParams) {}

  /**
   * Adds a search condition to the query based on the provided searchable fields.
   *
   * @param searchableFields - The fields to be searched.
   * @returns The current instance of QueryBuilder with the search condition applied.
   */
  search(searchableFields: string[]) {
    const { searchTerm } = this.query;

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchRegex },
        })),
      });
    }

    return this;
  }

  /**
   * Adds filtering conditions to the query based on the query parameters (excluding pagination, sort, etc.).
   *
   * @returns The current instance of QueryBuilder with the filter conditions applied.
   */
  filter() {
    const excludeFields = new Set([
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
    ]);
    const filterQuery = Object.entries(this.query)
      .filter(([key]) => !excludeFields.has(key))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as QueryParams);

    this.modelQuery = this.modelQuery.find(filterQuery as FilterQuery<T>);
    return this;
  }

  /**
   * Adds a sorting condition to the query based on the provided sort parameter.
   *
   * @returns The current instance of QueryBuilder with the sort condition applied.
   */
  sort() {
    const sortBy = this.query.sort?.replace(/,/g, " ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  /**
   * Adds pagination to the query based on the provided page and limit parameters.
   *
   * @returns The current instance of QueryBuilder with the pagination applied.
   */
  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  /**
   * Adds field selection to the query based on the provided fields parameter.
   *
   * @returns The current instance of QueryBuilder with the field selection applied.
   */
  fields() {
    const fieldsToSelect = this.query.fields?.replace(/,/g, " ") || "-__v";
    this.modelQuery = this.modelQuery.select(fieldsToSelect);
    return this;
  }

  /**
   * Counts the total number of documents in the query result, along with pagination information.
   *
   * @returns An object containing pagination information such as current page, limit, total documents, and total pages.
   */
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPages = Math.ceil(total / limit);

    return { page, limit, total, totalPages };
  }
}

export default QueryBuilder;
