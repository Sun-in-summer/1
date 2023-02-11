import { plainToInstance, ClassConstructor } from 'class-transformer'
import { CommandEvent } from '@guitar/shared-types';


export function fillObject<T, V> (someDto: ClassConstructor<T>, plainObject: V  ){
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues :true})
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  console.log(`mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`);
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function createEvent(commandEvent: CommandEvent) {
  return { cmd: commandEvent}
}

