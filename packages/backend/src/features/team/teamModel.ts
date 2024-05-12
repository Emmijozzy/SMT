import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITeam extends Document {
  teamId?: string; // Unique team identifier (automatically generated)
  name: string;
  description: string;
  memberIds?: string[]; // Array of ObjectIds referencing User documents
  managerId?: string; // Array of ObjectIds referencing Project documents (optional)
  createdAt?: Date;
  updatedAt?: Date;
}

const teamSchema = new Schema<ITeam>({
  teamId: {
    type: String,
    required: true,
    unique: true // Ensure unique team IDs
  },
  name: {
    type: String,
    required: true,
    maxLength: 255
  },
  description: {
    type: String
  },
  memberIds: [
    {
      type: String,
      ref: "User",
      path: "userId"
      // required: true
    }
  ],
  managerId: {
    type: String,
    ref: "User",
    path: "userId"
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// teamSchema.set("_id", false);

teamSchema.pre<ITeam>("save", async function (next) {
  if (!this.teamId) {
    this.teamId = uuidv4().substring(0, 5);
    //console.log(this.teamId);
  }
  next();
});

export default mongoose.model<ITeam>("Team", teamSchema);
