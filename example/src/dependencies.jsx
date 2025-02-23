import * as React from "react";
import * as amis from "amis";
import axios from "axios";
import * as amisCore from "amis-core";
import * as amisUi from "amis-ui";
import * as copyToClipboard from "copy-to-clipboard";
import * as reactRouter from "react-router";
import * as reactRouterDom from "react-router-dom";

const dependencies = {
  react: React,
  amis,
  axios,
  "amis-core": amisCore,
  "amis-ui": amisUi,
  "copy-to-clipboard": copyToClipboard,
  "react-router": reactRouter,
  "react-router-dom": reactRouterDom,
};

export default dependencies;
