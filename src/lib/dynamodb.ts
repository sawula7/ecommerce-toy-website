import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const raw = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "ap-south-1",
  // When running on Amplify the IAM role provides credentials automatically.
  // Locally, set AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY in .env.local.
  ...(process.env.AWS_ACCESS_KEY_ID
    ? {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      }
    : {}),
});

export const db = DynamoDBDocumentClient.from(raw, {
  marshallOptions: { removeUndefinedValues: true },
});

export const ORDERS_TABLE   = process.env.DYNAMODB_ORDERS_TABLE   ?? "edutoys-orders";
export const PRODUCTS_TABLE = process.env.DYNAMODB_PRODUCTS_TABLE ?? "edutoys-products";
export const USERS_TABLE    = process.env.DYNAMODB_USERS_TABLE    ?? "edutoys-users";
