import core from '@actions/core';
import execa from 'execa';
import fsExtra from 'fs-extra';

async function run() {
  try {
    const packageJson = fsExtra.readJsonSync('./package.json');
    const packageName = packageJson.name;
    const currentPackageVersion = packageJson.version;

    const { stdout: npmPackageVersion } = await execa.command(`npm view ${packageName} version`);

    const isVersionChanged = currentPackageVersion !== npmPackageVersion.trim();
    core.setOutput('is-version-changed', isVersionChanged.toString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
