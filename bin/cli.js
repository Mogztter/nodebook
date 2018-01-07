#!/usr/bin/env node

'use strict';

const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const yargs = require('yargs');

updateNotifier({ pkg }).notify();

yargs
  .commandDir('commands')
  .usage('$0')
  .example('$0 install chapter-04', 'Installe les dépendances du chapitre 4')
  .example('$0 install all', 'Installe les dépendances de tous les chapitres')
  .example('$0 open chapter-04', 'Ouvre le chapitre 4 dans un explorateur de fichiers')
  .demandCommand(1)
  .strict()
  .help()
  .argv;
