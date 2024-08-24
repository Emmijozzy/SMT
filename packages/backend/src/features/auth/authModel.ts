import mongoose, { Model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicUrl: string;
  password: string;
  role: "team_member" | "manager" | "admin";
  phone_no: string;
  teamId: string;
  team: string;
  location: string;
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
  socialLinks: {
    whatsappLink: string;
    facebookLink: string;
    linkedInLink: string;
  };
  del_flg: boolean;
  createdAt: Date;
  updatedAt: Date;
  updated_by: string;
  fullName?: string; // Optional property for pre-computed fullName
}

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      unique: true,
      description: "The unique identifier for the user."
    },
    firstName: {
      type: String,
      required: true,
      description: "The first name of the user."
    },
    lastName: {
      type: String,
      required: true,
      description: "The last name of the user."
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/, // Email validation pattern
      description: "The email address of the user."
    },
    profilePicUrl: {
      type: String,
      description: "The url of the profile pics uploaded by the user of the user."
    },
    password: {
      type: String,
      required: true,
      description: "The hashed password of the user."
    },
    phone_no: {
      type: String,
      description: "The phone number of the user"
    },
    location: {
      type: String,
      description: "Location/address of the user"
    },
    socialLinks: {
      whatsappLink: {
        type: String,
        description: "The Whatapp Link of the user"
      },
      facebookLink: {
        type: String,
        description: "The whatapp Link of the user"
      },
      linkedInLink: {
        type: String,
        description: "The LinkedIn Link of the user"
      }
    },
    role: {
      type: String,
      enum: ["team_member", "manager", "admin"],
      default: "team_member",
      description: "The role of the user."
    },
    teamId: {
      type: String,
      description: "The id of team the user belong to"
    },
    team: {
      type: String,
      description: "The team the user belong to"
    },
    permissions: {
      type: Object,
      default: {
        can_create_tasks: false, // manager && Admin
        can_edit_tasks: true, //team_member
        can_view_tasks: true, //team member
        can_view_reports: false,
        can_delete_tasks: false, //Admin & manager
        can_add_subtasks: false, //Admin & manger
        can_reassign_tasks: false, //Admin & manager
        can_delete_users: false, //Admin
        can_edit_users: false, //Admin
        can_assign_roles: false //Admin
      },
      description: "The permissions assigned to the user."
    },
    del_flg: {
      type: Boolean,
      default: false,
      description: "Flag indicating whether the user is deleted or not."
    },
    createdAt: {
      type: Date,
      default: Date.now,
      description: "The timestamp when the user was created."
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      description: "The timestamp when the user was last updated."
    },
    updated_by: {
      type: String,
      description: "The user ID or username of the person who last updated the user data."
    },
    fullName: {
      type: String
      // required: true
    }
  },
  { toJSON: { virtuals: true } }
);

// Pre-save hook to generate userId
userSchema.pre<IUser>("save", async function (next) {
  const UserCounter = mongoose.model<CounterDocument>("UserCounter");
  try {
    let counter = await UserCounter.findOne();
    if (!counter) {
      // If no counter document exists, create one with currentId as 1
      counter = new UserCounter({ currentId: 1 });
      await counter.save();
    }
    const firstNameFirstLetters = this.firstName.slice(0, 2).toUpperCase();
    const lastNameFirstLetters = this.lastName.slice(0, 2).toUpperCase();
    const userId = `${firstNameFirstLetters}${lastNameFirstLetters}${counter.currentId.toString().padStart(5, "0")}`;
    this.userId = userId;

    this.fullName = `${this.firstName} ${this.lastName}`;
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
const userCounterSchema: Schema<CounterDocument> = new Schema<CounterDocument>({
  currentId: { type: Number, default: 0 }
});

// Define the counter model
export const UserCounter: Model<CounterDocument> = mongoose.model<CounterDocument>("UserCounter", userCounterSchema);
