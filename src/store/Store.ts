type userId = string;

export interface Room {
  roomId: string;
  chats: Chat[];
}

export interface Chat {
  chatId: string;
  sender: userId;
  message: string;
  upvotes: userId[]; //storing who has upvoted what, not count
}

export abstract class Store {
  constructor() {}
  initRoom(roomId: string) {}
  getChats(roomId: string, limit: number, offset: number) {}
  addChat(roomId: string, chatId: string, sender: string, message: string) {}
  upvote(roomId: string, chatId: string, userId: string) {}
}
