import mongoose, { Model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "team_member" | "manager" | "admin";
  permissions: {
    can_create_tasks: boolean;
    can_edit_tasks: boolean;
    can_delete_tasks: boolean;
    can_view_reports: boolean;
    can_add_subtasks: boolean;
    can_reassign_tasks: boolean;
    can_delete_users: boolean;
    can_edit_users: boolean;
    can_assign_roles: boolean;
  };
  del_flg: boolean;
  createdAt: Date;
  updatedAt: Date;
  fullName?: string; // Optional property for pre-computed fullName
}

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/ // Email validation pattern
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["team_member", "manager", "admin"],
      default: "team_member"
    },
    permissions: {
      type: Object,
      default: {
        can_create_tasks: false, // manager && Admin
        can_edit_tasks: true, //team_member
        can_view_tasks: true, //team member
        can_delete_tasks: false, //Admin & manager
        can_add_subtasks: false, //Admin & manger
        can_reassign_tasks: false, //Admin & manager
        can_delete_users: false, //Admin
        can_edit_users: false, //Admin
        can_assign_roles: false //Admin
      }
    },
    del_flg: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    fullName: {
      type: String,
      get() {
        return (this as IUser).firstName + " " + (this as IUser).lastName;
      }
    }
  },
  { toJSON: { virtuals: true } }
);

// Pre-save hook to generate userId
userSchema.pre<IUser>("save", async function (next) {
  const Counter = mongoose.model<CounterDocument>("Counter");
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      // If no counter document exists, create one with currentId as 1
      counter = new Counter({ currentId: 1 });
      await counter.save();
    }
    const firstNameFirstLetters = this.firstName.slice(0, 2).toUpperCase();
    const lastNameFirstLetters = this.lastName.slice(0, 2).toUpperCase();
    const userId = `${firstNameFirstLetters}${lastNameFirstLetters}${counter.currentId.toString().padStart(5, "0")}`;
    this.userId = userId;
    // Increment the currentId for the next user
    counter.currentId += 1;
    await counter.save();
    next();
  } catch (error) {
    throw new Error(`Error generating userId:${error}`);
  }
});

// Define the user model
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

// Define interface for the counter document
interface CounterDocument extends Document {
  currentId: number;
}

// Define the counter schema
const counterSchema: Schema<CounterDocument> = new Schema<CounterDocument>({
  currentId: { type: Number, default: 0 }
});

// Define the counter model
export const Counter: Model<CounterDocument> = mongoose.model<CounterDocument>("Counter", counterSchema);
