#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const versionFile = path.join(process.cwd(), "./.version");
const { execSync } = require('child_process');

const HELP = `
\x1b[36mVersionFlow Help\x1b[0m

Usage:

    \x1b[36mversionflow\x1b[0m
        See the current version.
    \x1b[36mversionflow \x1b[33m[...args]\x1b[0m
        Update the current project version.

Arguments:

    \x1b[33m-h --help\x1b[0m
        Prints what you're looking at right now.

    \x1b[33m-i --init\x1b[0m
        Initiate VersionFlow in the current directory (creates \x1b[32m.version\x1b[0m file)
    
    \x1b[33m-u --update \x1b[35m[patch/minor/major]\x1b[0m
        Increment the version, if the second part is omitted, the version will be updated without incrementing.
    
    \x1b[33m-p --phase \x1b[32m<phase>\x1b[0m
        Update the phase, note that this will not increment anything on the version unless explicitly mentioned.
    
    \x1b[33m-s --silent\x1b[0m
        Update the version without committing and tagging.
    
    \x1b[33m-S --set \x1b[32m<version>\x1b[0m
        Manually update a version.
    
    \x1b[33m-m --message \x1b[32m<message>\x1b[0m
        Set the commit/tag message, mandatory when you're not using --silent.
        
    \x1b[33m-P --push\x1b[0m
        Push after committing, this will run \x1b[32mgit push --follow-tags\x1b[0m
    
`;

let command = null;
let commitMessage = "";
let dontCommit = false;
const fileExists = fs.existsSync(versionFile);

let phase = null;
let push = false;

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
        case "-P":
        case "--push":
            push = true;
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
    if (push) {
        execSync(`git push`);
        execSync(`git push --follow-tags`)
    }
}