import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HelperService {
  
  async hash(value: string, salt: number = 10) {
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }

  capitalizeLetter(word: string) {
    const char = word.charAt(0).toUpperCase();
    return char + word.slice(1, word.length);
  }
}