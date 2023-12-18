export abstract class Usecase<RESULT> {
  abstract execute(...args: any[]): RESULT;
}
