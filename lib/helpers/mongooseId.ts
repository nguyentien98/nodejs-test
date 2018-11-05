import * as mongoose from 'mongoose';

export default function mongooseId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);  
}