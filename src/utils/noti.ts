import { message } from "antd";
import { isString } from "lodash";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

const noti = {
  success: message.success,
  info: message.info,
  warning: message.warning,
  error: message.error,
  quick: content => {
    message.success(content, 0.85);
  },
};

export default noti;
