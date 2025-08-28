import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <body style="padding: 0; margin: 0; box-sizing: border-box;">
    <h1 style="background-color: black; color: white; padding: 10px">welcome to my articles api</h1>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h3>checkout my docs below</h3>
    <a style="text-decoration: none; color: white; font-size: bold; border: 5px; background-color: grey; padding: 10px;" href='http://localhost:3000/api/docs'>docs</a>
    <h3>Author: Abula Martins Onyemuche</h3>
    <a title="click me" style="text-decoration: none; color: black;" href="https://github.com/mdmuche">Github</a>
    </div>
    </body>
    `;
  }
}
