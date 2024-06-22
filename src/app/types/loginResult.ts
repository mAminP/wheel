export class LoginResultUser {
  "mobile_number": string;
  "name": string;
  "remainingChance": number;
  "inviteCode": string
}
export class LoginResultData {
  "lastReward": any | null;
  "token": string;
  "user": LoginResultUser;
  "mobile_number": string;
  "name": string;
  "remainingChance": number;
}
export class LoginResult {
  "data": LoginResultData;
  "message": string;
  "success": boolean;
}