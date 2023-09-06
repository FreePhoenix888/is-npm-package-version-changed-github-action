import core from '@actions/core';
import {execa} from 'execa';
import fsExtra from 'fs-extra';
import debug from 'debug';
import semver from 'semver'

async function run() {
  const log = debug(`is-npm-package-version-changed-github-action`)
  try {
    const packageJson = fsExtra.readJsonSync('./package.json');
    log({packageJson})
    const packageName = packageJson.name;
    log({packageName})
    const currentPackageVersion = packageJson.version;
    log({currentPackageVersion})

    const { stdout: npmPackageVersion } = await execa(`npm`, [`view`,packageName, `version`]);
    log({npmPackageVersion})

    const isVersionChanged = semver.gt(currentPackageVersion, npmPackageVersion.trim());
    log({isVersionChanged})

    core.setOutput('is-version-changed', isVersionChanged.toString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
