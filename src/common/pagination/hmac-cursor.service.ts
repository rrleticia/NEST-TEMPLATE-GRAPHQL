import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class HMACCursorService {
  private secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('hmac.cursorSecret');

    if (!this.secretKey) {
      throw new Error('HMAC secret key is not set in configuration.');
    }
  }

  // Generate an HMAC cursor from a string ID
  encodeCursor(id: string): string {
    const hmac = crypto.createHmac('sha256', this.secretKey);
    hmac.update(id);
    return `${id}:${hmac.digest('base64url')}`;
  }

  // Decode the cursor and extract the original ID
  decodeCursor(cursor: string | undefined): string | undefined {
    if (!cursor) {
      return undefined;
    }

    const [id, providedHmac] = cursor.split(':');
    if (!id || !providedHmac) return undefined;

    // Recompute HMAC for the given ID
    const expectedHmac = crypto
      .createHmac('sha256', this.secretKey)
      .update(id)
      .digest('base64url');

    return expectedHmac === providedHmac ? id : undefined;
  }
}
