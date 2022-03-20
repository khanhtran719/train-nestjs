import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'typeorm';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  transform(value: any): ObjectID {
    const validObjectId: boolean = ObjectID.isValid(value);

    if (validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const objectId: ObjectID = ObjectID.createFromHexString(value);
    return objectId;
  }
}
