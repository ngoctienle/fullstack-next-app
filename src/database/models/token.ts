import mongoose, { Schema, Model, Document } from 'mongoose'

export interface TokenDocument extends Document {
  userId: string
  token: string
  expiresAt: Date
}

const TokenSchema = new Schema<TokenDocument>(
  {
    userId: {
      type: Schema.Types.Mixed,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

const Token: Model<TokenDocument> =
  mongoose.models.Token || mongoose.model<TokenDocument>('Token', TokenSchema)

export default Token
