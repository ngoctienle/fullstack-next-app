import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IUserModel extends Document {
  name: string
  email: string
  password: string
  role?: string
  image?: string
  emailVerified?: boolean
  defaultPaymentMethod?: string
  address?: {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    address1?: string
    address2?: string
    city?: string
    zipCode?: string
    state?: string
    country?: string
    active?: boolean
  }[]
  createdAt?: Date
  updatedAt?: Date
}

const userSchema: Schema = new mongoose.Schema<IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your fullname!']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please enter your password!']
    },
    role: {
      type: String,
      default: 'user'
    },
    image: {
      type: String,
      default: ''
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    defaultPaymentMethod: {
      type: String,
      default: ''
    },
    address: [
      {
        firstName: {
          type: String
        },
        lastName: {
          type: String
        },
        phoneNumber: {
          type: String
        },
        address1: {
          type: String
        },
        address2: {
          type: String
        },
        city: {
          type: String
        },
        zipCode: {
          type: String
        },
        state: {
          type: String
        },
        country: {
          type: String
        },
        active: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
)

const User: Model<IUserModel> =
  mongoose.models.User || mongoose.model<IUserModel>('User', userSchema)

export default User
