import { EggPlugin } from 'egg';
// import path from 'path';

const plugin: EggPlugin = {
  tegg: {
    enable: true,
    package: '@eggjs/tegg-plugin',
  },
  teggConfig: {
    enable: true,
    package: '@eggjs/tegg-config',
  },
  teggController: {
    enable: true,
    package: '@eggjs/tegg-controller-plugin',
  },
  teggSchedule: {
    enable: true,
    package: '@eggjs/tegg-schedule-plugin',
  },
  eventbusModule: {
    enable: true,
    package: '@eggjs/tegg-eventbus-plugin',
  },
  aopModule: {
    enable: true,
    package: '@eggjs/tegg-aop-plugin',
  },
  tracer: {
    enable: true,
    package: 'egg-tracer',
  },
  // ua: {
  //   enable: true,
  //   package: path.join(__dirname, '../lib/plugin/egg-ua'),
  // },
  // mysql: {
  //   enable: true,
  //   package: path.join(__dirname, './config.db.ts'),
  // },
};

export default plugin;
