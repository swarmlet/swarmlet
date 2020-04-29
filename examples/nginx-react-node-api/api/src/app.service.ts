import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getData(): string {
    return JSON.stringify(
      new Array(10).fill('').map((e, i) => ({ id: i, value: Math.random() })),
    );
  };
;}
