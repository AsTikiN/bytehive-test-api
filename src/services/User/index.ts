import { FilterQuery, PipelineStage } from "mongoose";
import User, { UserModel } from "../../models/User";

export const createUser = async (userData: Partial<UserModel>) => {
  try {
    return await User.create({ ...userData, lastActiveDate: "test message" });
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (userId: string, updates: Partial<UserModel>) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
};

export const getUserByQuery = async (query: Partial<UserModel>) => {
  try {
    return await User.findOne(query as FilterQuery<UserModel>);
  } catch (error) {
    throw new Error("Failed to fetch user by email");
  }
};

export const getUserById = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error("Failed to fetch user by id");
  }
};

export const getUsersStatData = async () => {
  try {
    const result = await User.aggregate([
      {
        $facet: {
          isWhopUserTrue: [{ $match: { isWhopUser: true } }, { $count: "whop" }],
          isGoogleUserTrue: [{ $match: { isGoogleUser: true } }, { $count: "google" }],
          isWhopUserFalse: [{ $match: { isWhopUser: false, isGoogleUser: false } }, { $count: "regular" }],
          total: [{ $count: "total" }],
        },
      },
      {
        $project: {
          whop: { $ifNull: [{ $arrayElemAt: ["$isWhopUserTrue.whop", 0] }, 0] },
          google: { $ifNull: [{ $arrayElemAt: ["$isGoogleUserTrue.google", 0] }, 0] },
          regular: { $ifNull: [{ $arrayElemAt: ["$isWhopUserFalse.regular", 0] }, 0] },
          total: { $ifNull: [{ $arrayElemAt: ["$total.total", 0] }, 0] },
        },
      },
    ]);

    return result[0];
  } catch (e) {
    console.log(e);
  }
};

export const searchUsers = async (
  search: string,
  page: number,
  limit: number,
  sort: { sortBy: "complete" | "incomplete" | "balance"; isAscending: boolean } | null,
): Promise<any> => {
  try {
    const skip = (page - 1) * limit;
    const fullNameSearch = new RegExp(search.split(" ").join(""), "i");

    const query = {
      $or: [
        { email: new RegExp(search, "i") },
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        {
          $expr: {
            $regexMatch: { input: { $concat: ["$firstName", "$lastName"] }, regex: fullNameSearch },
          },
        },
        {
          $expr: {
            $regexMatch: { input: { $toString: "$_id" }, regex: new RegExp(search, "i") },
          },
        },
      ],
    };

    const pipeline: PipelineStage[] = [
      { $match: query },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          balance: 1,
          spent: 1,
          bookAmount: 1,
          limits: 1,
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "books",
          foreignField: "_id",
          as: "userBooks",
        },
      },
      {
        $addFields: {
          completedBooksCount: {
            $size: {
              $filter: {
                input: "$userBooks",
                as: "book",
                cond: {
                  $or: [{ $eq: ["$$book.status", "Completed"] }, { $eq: ["$$book.status", "Failed"] }],
                },
              },
            },
          },
          incompleteBooksCount: {
            $size: {
              $filter: {
                input: "$userBooks",
                as: "book",
                cond: {
                  $not: {
                    $or: [{ $eq: ["$$book.status", "Completed"] }, { $eq: ["$$book.status", "Failed"] }],
                  },
                },
              },
            },
          },
        },
      },
      { $skip: skip },
      { $limit: Number(limit) },
    ];

    const sortDirection = !sort || sort.isAscending ? -1 : 1;
    if (!sort) {
      pipeline.push({ $sort: { _id: sortDirection } });
    } else if (sort.sortBy === "balance") {
      pipeline.push({ $sort: { balance: sortDirection } });
    } else if (sort.sortBy === "complete") {
      pipeline.push({ $sort: { completedBooksCount: sortDirection } });
    } else if (sort.sortBy === "incomplete") {
      pipeline.push({ $sort: { incompleteBooksCount: sortDirection } });
    }

    const users = await User.aggregate(pipeline);

    const totalUsersCount = await User.countDocuments(query);
    return { users, totalUsersCount };
  } catch (e) {
    console.log(e);
  }
};
