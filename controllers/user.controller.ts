import User from "../models/user.model";
import mongoose from "mongoose";
import { IUpdateUserPost, IUser, IUserPost } from "../interfaces/user.interface";
import { genSaltSync, hashSync } from "bcrypt";
export const index = async (): Promise<IUser[]> => {
  try {
    const gateways: IUser[] = await User.find({},{},{password: false});
    // gateways.map((el) => delete el.password);
    return gateways;
  } catch (e) {
    throw e;
  }
};

export const show = async (id: mongoose.Types.ObjectId): Promise<IUser> => {
  try {
    let gateway: IUser | null = await User.findById(id,{password: false});
    if (gateway) {
      delete gateway.password;
      return gateway;
    } else {
      throw { code: 404, message: "unknown id" };
    }
  } catch (e) {
    throw e;
  }
};

export const create = async (user: IUserPost): Promise<IUser> => {
  try {
    const date = new Date().toDateString();
    var salt = genSaltSync(10);
    var hash = hashSync(user.password, salt);
    user.password = hash;
    const new_user = await User.create({
      ...user,
      created_at: date,
      updated_at: date,
    });
    return await show(new_user._id);
  } catch (e) {
    console.log("ERROR")
    throw e;
  }
};

export const update = async (
  id: string,
  newData: IUpdateUserPost
): Promise<IUser> => {
  try {
    const gateway = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { ...newData, updated_at: new Date().toDateString() } }
    );
    if (!gateway) {
      throw { code: 404, message: "unknown id" };
    } else {
      return await show(new mongoose.Types.ObjectId(id));
    }
  } catch (e) {
    throw e;
  }
};

export const remove = async (id: string): Promise<IUser> => {
  try {
    const oldData = await show(new mongoose.Types.ObjectId(id));
    if (!oldData) {
      throw { code: 404, message: "unknown id" };
    } else {
      await User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
      return oldData;
    }
  } catch (e) {
    throw e;
  }
};
