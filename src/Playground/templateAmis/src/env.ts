/**
 * Amis env 配置
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/docs/start/getting-started#env
 */

import { toast, makeTranslator } from "amis";
import { normalizeLink, attachmentAdpator } from "amis-core";
import { alert, confirm } from "amis-ui";
import axios from "axios";
import copy from "copy-to-clipboard";
import { matchPath } from "react-router-dom";

const __ = makeTranslator('zh');

const env = {
  session: "playground",
  updateLocation: (location, replace) => {
    console.log('updateLocation', {
      type: replace ? "replace" : "push",
      url: normalizeLink(location)
    })
  },
  isCurrentUrl: (to) => {
    if (!to) {
      return false;
    }
    const link = normalizeLink(to);
    return !!matchPath(location.pathname, {
      path: link,
      exact: true,
    });
  },
  jumpTo: (to, action) => {
    to = normalizeLink(to);

    if (action && action.actionType === "url") {
      action.blank === true ? window.open(to) : (window.location.href = to);
      return;
    }

    if (action && to && action.target) {
      window.open(to, action.target);
      return;
    }

    if (/^https?:\/\//.test(to)) {
      window.location.replace(to);
    } else {
      history.push(to);
    }
  },
  fetcher: async (api) => {
    let { url, method, data, responseType, config, headers } = api;
    config = config || {};
    // 如果在 gh-pages 里面
    if (typeof url === "string" && url.startsWith("/amis/")) {
      url = url.replace(/^\/amis\//, "https://aisuda.bce.baidu.com/amis/");
    }

    config.url = url;
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
      config.cancelToken = new axios.CancelToken(config.cancelExecutor);
    }

    config.headers = headers || {};
    config.method = method;
    config.data = data;

    if (method === "get" && data) {
      config.params = data;
    } else if (data && data instanceof FormData) {
      // config.headers['Content-Type'] = 'multipart/form-data';
    } else if (
      data &&
      typeof data !== "string" &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      data = JSON.stringify(data);
      config.headers["Content-Type"] = "application/json";
    }

    // 支持返回各种报错信息
    config.validateStatus = function () {
      return true;
    };

    let response = await axios(config);
    response = await attachmentAdpator(response, __, api);

    if (response.status >= 400) {
      if (response.data) {
        // 主要用于 raw: 模式下，后端自己校验登录，
        if (
          response.status === 401 &&
          response.data.location &&
          response.data.location.startsWith("http")
        ) {
          location.href = response.data.location.replace(
            "{{redirect}}",
            encodeURIComponent(location.href)
          );
          return new Promise(() => {});
        } else if (response.data.msg) {
          throw new Error(response.data.msg);
        } else {
          throw new Error(
            __("System.requestError") + JSON.stringify(response.data, null, 2)
          );
        }
      } else {
        throw new Error(
          `${__("System.requestErrorStatus")} ${response.status}`
        );
      }
    }

    return response;
  },
  isCancel: (value) => axios.isCancel(value),
  notify: (type, msg, conf) =>
    toast[type] ? toast[type](msg, conf) : console.warn("[Notify]", type, msg),
  alert,
  confirm,
  copy: (content, options) => {
    copy(content, options);
    toast.success(__("System.copy"));
  },
  tracker(eventTrack) {
    console.debug("eventTrack", eventTrack);
  },
  replaceText: {
    AMIS_HOST: "https://baidu.gitee.io/amis",
  },
  loadTinymcePlugin: async (tinymce) => {
    // 参考：https://www.tiny.cloud/docs/advanced/creating-a-plugin/
    /*
          Note: We have included the plugin in the same JavaScript file as the TinyMCE
          instance for display purposes only. Tiny recommends not maintaining the plugin
          with the TinyMCE instance and using the `external_plugins` option.
        */
    tinymce.PluginManager.add("example", function (editor, url) {
      var openDialog = function () {
        return editor.windowManager.open({
          title: "Example plugin",
          body: {
            type: "panel",
            items: [
              {
                type: "input",
                name: "title",
                label: "Title",
              },
            ],
          },
          buttons: [
            {
              type: "cancel",
              text: "Close",
            },
            {
              type: "submit",
              text: "Save",
              primary: true,
            },
          ],
          onSubmit: function (api) {
            var data = api.getData();
            /* Insert content when the window form is submitted */
            editor.insertContent("Title: " + data.title);
            api.close();
          },
        });
      };
      /* Add a button that opens a window */
      editor.ui.registry.addButton("example", {
        text: "My button",
        onAction: function () {
          /* Open window */
          openDialog();
        },
      });
      /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
      editor.ui.registry.addMenuItem("example", {
        text: "Example plugin",
        onAction: function () {
          /* Open window */
          openDialog();
        },
      });
      /* Return the metadata for the help plugin */
      return {
        getMetadata: function () {
          return {
            name: "Example plugin",
            url: "http://exampleplugindocsurl.com",
          };
        },
      };
    });
  },
};

export default env;
