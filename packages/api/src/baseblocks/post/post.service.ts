import { Post } from '@baseline/types/post';
import { getDynamodbConnection } from '@baselinejs/dynamodb';
import { ServiceObject } from '../../util/service-object';

const dynamoDb = getDynamodbConnection({
  region: `${process.env.API_REGION}`,
});

export const postService = new ServiceObject<Post>({
  dynamoDb: dynamoDb,
  objectName: 'Post',
  table: `${process.env.APP_NAME}-${process.env.NODE_ENV}-post`,
  primaryKey: 'postId',
});
