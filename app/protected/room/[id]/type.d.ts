// プレイヤーの型定義
export interface Player {
    name: string
    coin: number
  }

  interface UserProfile {
    name: string;
  }
  
export  interface User {
    user_auth_id: string;
    coins: number;
    userprofile: UserProfile;
  }