import { Chat, Room, Store } from "./Store";

let globalChatId = 0;
class inMemoryStore implements Store {
  private store: Map<string, Room>;
  constructor() {
    this.store = new Map<string, Room>();
  }
  initRoom(roomId: string) {
    this.store.set(roomId, {
      roomId,
      chats: [],
    });
  }
  getChats(roomId: string, limit: number, offset: number) {
    const room = this.store.get(roomId);
    if (!room) {
      return [];
    }
    const skip: number = limit * (offset - 1);
    return room.chats.slice(skip, skip + offset).reverse();
    /*
    say i have x= [1,2,3,4,5]
    i want to get 2 per page 
    [1,2]-- page 1
    [3,4]-- page 2
    [5]-- page 3
    limit = 2
    page no = offset
    to get page 2, l=2, o=2
    s = l*(o-1) = 2*1 = 2
    e = s+o = 2+2 = 4
    */
  }
  addChat(roomId: string, chatId: string, sender: string, message: string) {
    const room = this.store.get(roomId);
    if (!room) {
      return;
    }
    let newChat = {
      chatId: (globalChatId++).toString(),
      sender,
      message,
      upvotes: [],
    };
    room.chats.push(newChat);
  }
  upvote(roomId: string, upChatId: string, userId: string) {
    const room = this.store.get(roomId);
    if (!room) {
      return;
    }
    const chat = room.chats.find(({ chatId }) => chatId === upChatId);
    if (chat) {
      chat.upvotes.push(userId);
    }
  }
}
