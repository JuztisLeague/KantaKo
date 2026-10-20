import {randomUUID} from 'node:crypto';

const rooms = new Map();


function generateRoomCode(){
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * chars.length);
    code += chars[num];
  }
    return code;
} 

export function createRoom(name) {
    let code = generateRoomCode();
    while (rooms.has(code)) {
        code = generateRoomCode();
    }

const room = {
    code,
    name,
    hostToken: randomUUID(),
    queue: [],
    current: null,
}
     rooms.set(code, room);
    return room;
}

export function getRoom(code) {
  return rooms.get(String(code).toUpperCase());
}

export function toPublicRoom(room) {
  return {
    code: room.code,
    name: room.name,
    queue: room.queue,
    current: room.current,
  };
}

export function addSong(room, song) {
    const entry = {
    videoId: song.videoId,
    title: song.title,
    thumbnail: song.thumbnail,
    channel: song.channel,
    userName: song.userName,
  };

  room.queue.push(entry);
  return entry;
  }