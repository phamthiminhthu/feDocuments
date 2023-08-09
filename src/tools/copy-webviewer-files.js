import { copy } from "fs-extra";

const copyFiles = async () => {
  try {
    await copy(
      "./node_modules/@pdftron/webviewer/public",
      "./static/webviewer/"
    );
    // console.log("WebViewer files copied over successfully");
  } catch (err) {
    console.error(err);
  }
};

copyFiles();
