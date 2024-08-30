#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const versionFile = path.join(process.cwd(), "./.version");
const { execSync } = require('child_process');

const HELP = `
\x1b[36mVersionflow Help\x1b[0m

Usage:
    versionflow: See the current version.
    versionflow [...args]: Update the current project version.

    -h --help: Prints what you're looking at right now.
    -u --update [patch/minor/major]: Increment the version, if omitted, the version will be updated without incrementing.
    -p --phase <phase>: Update the phase, note that this will not increment anything on the version unless explicitly mentioned.
    -s --silent: Update the version without committing and tagging.
    -i --init: Initiate VersionFlow in the current directory (creates .version file)
    -S --set <version>: Manually update a version.
    -m --message <message>: Set the commit/tag message, mandatory when you're updating the version with git.
    
`;

let command = null;
let commitMessage = "";
let dontCommit = false;
const fileExists = fs.existsSync(versionFile);

let phase = null;

process.argv.forEach((argument, i, args) => {
    let next = args[i+1];
    if (next && next.startsWith("-")) next = null;
    switch(argument) {
        case "-h":
        case "--help":
            console.log(HELP);
            process.exit(0);
            break;
        case "-i":
        case "--init":
            const ver = next ?? "1.0.0";
            fs.writeFileSync(versionFile, ver);
            console.log("Initialized VersionFlow at " + ver);
            const packageFile = path.join(process.cwd(), "./package.json");
            if (fs.existsSync(packageFile)) {
                execSync(`npm pkg set 'version'='${ver}'`);
            }
            process.exit(0);
            break;
        case "-S":
        case "--set":
            if (!next) {
                console.error("Invalid version");
                process.exit(1);
            }
            command = "no-increment";
            fs.writeFileSync(versionFile, next);
            break;
        case "-u":
        case "--update":
            command = next ?? "no-increment";
            break;
        case "-m":
        case "--message":
            commitMessage = next ?? commitMessage;
            break;
        case "-p":
        case "--phase":
            phase = next ?? phase;
            break;
        case "-s":
        case "--silent":
            dontCommit = true;
            break;
    }

})

let readVersion = "";
if (fileExists) {
    readVersion = fs.readFileSync(versionFile).toString();
}
let rawVersion = readVersion;

if (!command) {
    if (fileExists) {
        console.log("Current version: \x1b[36m%s\x1b[0m", readVersion);
    } else {
        console.log("No version file found. Use: versionflow --init");
    }
    process.exit(0);
}

if (rawVersion.includes("-")) {
    const splits = rawVersion.split("-", 2);
    rawVersion = splits.shift();
    phase = splits.join("-") ?? phase;
}
let versionParts = rawVersion.split(".");
let major = parseInt(versionParts[0]);
let minor = parseInt(versionParts[1]);
let patch = parseInt(versionParts[2]);

switch(command) {

    case "patch":
        patch++;
        break;

    case "minor":
        minor++;
        patch = 1;
        break;

    case "major":
        major++;
        minor = 0;
        patch = 1;
        break;
}

const newVersion = [major, minor, patch + (phase ? "-"  + phase : "")].join(".");

fs.writeFileSync(versionFile, newVersion);

const packageFile = path.join(process.cwd(), "./package.json");
if (fs.existsSync(packageFile)) {
    execSync(`npm pkg set version=${newVersion}`);
}

console.log("Version updated");
console.log(newVersion);
if (!dontCommit) {
    execSync(`git commit -a -m \"${commitMessage}\"`);
    execSync(`git tag -a v${newVersion} -m \"VersionFlow: ${commitMessage}\"`);
}
