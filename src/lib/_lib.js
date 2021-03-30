const RoomData = require("./room_data")
const Analytics = require("./analytics")

const lib = {
  ws: require("ws"),
  log: require("./log"),
  Client: require("../client/client"),
  ErrorCodes: require("./error_codes"),
  event: require("./event/_events"),
  util: require("./util"),
  appInfo: require("./app_info"),
  SocketGroup: require("./socket_group"),
  analytics: new Analytics(),
  roomData: new RoomData(),
  init: async () => {
    await lib.roomData.init()
    await shared.db.pg.init()
    await shared.db.dynamo.init()
  },
  cleanup: async () => {
    await shared.db.pg.tearDown()
  },
  error: async (code, message, data = {}) => {
    return Object.assign({
      success: false,
      code: code,
      message: message,
      data: data,
    })
  },
}

global.log = lib.log
global.shared = require("@withso/with-shared")

global.lib = lib

module.exports = lib
