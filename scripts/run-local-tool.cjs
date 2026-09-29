const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const command = process.argv[2] || 'dev';
const env = { ...process.env };
if (command !== 'typecheck') {
  env.PORT ||= '5173';
  env.BASE_PATH ||= '/';
}
const cliPaths = {
  vite: path.join('vite', 'bin', 'vite.js'),
  tsc: path.join('typescript', 'bin', 'tsc'),
};
const binDirectories = [
  path.join(projectRoot, 'node_modules', '.bin'),
  path.resolve(projectRoot, '..', '..', 'node_modules', '.bin'),
];
const findBin = (name) => {
  return binDirectories
    .map((directory) => path.join(path.dirname(directory), cliPaths[name]))
    .find((candidate) => fs.existsSync(candidate));
};

function run(program, args) {
  const result = spawnSync(process.execPath, [program, ...args], {
    cwd: projectRoot,
    env,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(`Could not start ${program}: ${result.error.message}`);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

let viteBin = findBin('vite');
let typescriptBin = findBin('tsc');
const needsInstall =
  command === 'typecheck' ? !typescriptBin : !viteBin;

if (needsInstall) {
  console.log(
    'Project dependencies are not installed. Running npm install first...',
  );
  const npmCommand = 'npm';
  const install = spawnSync(
    npmCommand,
    ['install', '--no-audit', '--no-fund'],
    {
      cwd: projectRoot,
      env: process.env,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    },
  );

  if (install.error) {
    console.error(`Could not run npm install: ${install.error.message}`);
    process.exit(1);
  }

  if (install.status !== 0) {
    console.error(
      'npm install failed. Check your internet connection and try npm install again.',
    );
    process.exit(install.status ?? 1);
  }

  viteBin = findBin('vite');
  typescriptBin = findBin('tsc');
}

if (command === 'typecheck') {
  if (!typescriptBin) {
    console.error(
      'TypeScript is still unavailable after npm install. Delete node_modules and run npm install again.',
    );
    process.exit(1);
  }
  run(typescriptBin, ['-p', 'tsconfig.json', '--noEmit']);
}

if (!viteBin) {
  console.error(
    'Vite is still unavailable after npm install. Delete node_modules and run npm install again.',
  );
  process.exit(1);
}

const viteArgs = ['--config', 'vite.config.ts'];

if (command === 'dev') {
  viteArgs.push('--host', '0.0.0.0');
} else if (command === 'build') {
  viteArgs.unshift('build');
} else if (command === 'serve') {
  viteArgs.unshift('preview', '--host', '0.0.0.0');
} else {
  console.error(`Unknown npm script command: ${command}`);
  process.exit(1);
}

run(viteBin, viteArgs);