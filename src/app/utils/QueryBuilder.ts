import { FilterQuery, Query } from "mongoose";

export type QueryParams = {
  searchTerm?: string;
  sort?: string;
  limit?: string | number;
  page?: string | number;
  fields?: string;
  [key: string]: unknown;
};

class QueryBuilder<T> {
  constructor(public modelQuery: Query<T[], T>, public query: QueryParams) {}

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

  sort() {
    const sortBy = this.query.sort?.replace(/,/g, " ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fieldsToSelect = this.query.fields?.replace(/,/g, " ") || "-__v";
    this.modelQuery = this.modelQuery.select(fieldsToSelect);
    return this;
  }

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
