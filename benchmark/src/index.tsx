// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import ReactDOM from "react-dom";

import Logger from "@foxglove/log";

const log = Logger.getLogger(__filename);
log.debug("initializing");

window.onerror = (...args) => {
  console.error(...args);
};

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("missing #root element");
}

async function main() {
  const renderCallback = () => {
    // Integration tests look for this console log to indicate the app has rendered once
    log.debug("App rendered");
  };

  const { installDevtoolsFormatters, overwriteFetch, waitForFonts } = await import(
    "@foxglove/studio-base"
  );
  installDevtoolsFormatters();
  overwriteFetch();
  // consider moving waitForFonts into App to display an app loading screen
  await waitForFonts();

  const { Root } = await import("./Root");

  ReactDOM.render(<Root />, rootEl, renderCallback);
}

void main();
