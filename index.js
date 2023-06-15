const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

async function run() {
  try {
    let currentPackageVersion;
    let npmPackageVersion;
    await exec.exec('node -p "require(\'./package.json\').version"', [], { listeners: { stdout: (data) => { currentPackageVersion = data.toString().trim(); }}});
    await exec.exec(`npm view @${github.context.repo.owner}/${github.context.repo.repo} version`, [], { listeners: { stdout: (data) => { npmPackageVersion = data.toString().trim(); }}});

    const isVersionChanged = currentPackageVersion !== npmPackageVersion;
    core.setOutput('is-version-changed', isVersionChanged.toString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
