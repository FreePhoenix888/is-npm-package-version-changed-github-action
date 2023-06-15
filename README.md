This github action checks whether your current package version and package version from npm diffenrt

# Using
```
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-node@v3
  - id: check-is-version-updated
    uses: <Your GitHub username>/check-if-version-is-updated@v1
  - name: Run if version has changed
    run: echo "Version has changed! Do something here..."
    if: steps.check-is-version-updated.outputs.is-version-changed == 'true'
  - name: Run if version has NOT changed
    run: echo "Version has NOT changed! Do something else here..."
    if: steps.check-is-version-updated.outputs.is-version-changed == 'false'
```
