const express = require("express");
const fs = require("fs-extra");
const puppeteer = require("puppeteer");
const path = require("path");
const app = express();

/**
 * Creates a snapshot using puppeteer and deploys it in a given destination.
 * @param {*} path
 * @param {*} destination
 */
async function createSnapshot(path, destination) {
  const url = `${process.env.BASE}${path}`;

  console.log("Generating snapshot", url, destination);

  fs.removeSync(destination);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (process.env.USER && process.env.PASS) {
    page.authenticate({
      username: process.env.USER,
      password: process.env.PASS
    });
  }

  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
  );
  await page.goto(url, { waitUntil: "networkidle0" });
  const content = await page.content();

  fs.ensureFileSync(destination);
  fs.writeFileSync(destination, content);

  await browser.close();
}

/**
 * Snapshot is valid if it exists and its size is greater than 100 KBs.
 */
function isValidSnapshot(snapshotFile) {
  const validSize = process.env.VALID_SIZE || 50;

  return (
    fs.pathExistsSync(snapshotFile) &&
    fs.statSync(snapshotFile).size / 1000 > validSize
  );
}

/**
 * Obtains snapshot file.
 * @param {*} path
 */
function getSnapshotFile(path) {
  const homeFixedPath = path === "/" ? "index" : path;

  return `${process.env.DESTINATION}/${homeFixedPath}.html`;
}

app.get("/", async (req, res) => {
  try {
    const requestedPath = req.query.url;
    const snapshotFile = getSnapshotFile(requestedPath);

    if (!isValidSnapshot(snapshotFile)) {
      await createSnapshot(requestedPath, snapshotFile);
    }

    res.sendFile(path.resolve(snapshotFile));
  } catch (e) {
    res.status(503);
    res.send("Error generating snapshot");
  }
});

app.listen(process.env.PORT || 3000);
