
function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * chars.length);
    code += chars[num];
  }
    return code;
}

export default generateRoomCode;
